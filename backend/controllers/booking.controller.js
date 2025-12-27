
import Booking from "../models/booking.model.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

export const createBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut, totalRent, ratings, rent } = req.body;

    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found in create booking" });
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({ message: "Invalid checkIn / checkOut dates" });
    }

    if (listing.isBooked) {
      return res.status(400).json({ message: "Listing is already booked" });
    }

    // ✅ Create booking (now includes rent)
    const booking = await Booking.create({
      checkIn,
      checkOut,
      rent: rent || listing.rent,
      totalRent,
      host: listing.host,
      guest: req.userId,
      listing: listing._id,
      ratings,
    });

    await booking.populate("host","email")

    // ✅ Add this booking to user's booking list
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $push: { booking:listing } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found while creating booking" });
    }

    // ✅ Update listing
    listing.guest = req.userId;
    listing.isBooked = true;
    await listing.save();

    return res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json({ message: `Error in create booking: ${error.message}` });
  }
};

export const canceleBooking = async (req,res) => {
    try {
        let {id} = req.params;
        let listing = await Listing.findByIdAndUpdate(id,{
            isBooked:false})

            let user = await User.findByIdAndUpdate(listing.guest,{
                $pull:{booking:listing._id}
            },{new:true})
        if(!user){
            return res.status(404).json({message:"user not found for cancle booking"})
        }

        return res.status(200).json({message:"Booking cancelled"})
    } catch (error) {
        return res.status(500).json({message:`errro in cancle booking ${error}`})
    }
}
