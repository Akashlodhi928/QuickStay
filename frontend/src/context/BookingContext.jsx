import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userDataCotext } from "./UserContext";
import { listingDataContext } from "./ListingContext";
import { authDataContext } from "./AuthContext";

export const bookingDataConetext = createContext();

function BookingContex({ children }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [total, setTotal] = useState(0);
  const [night, setNight] = useState(0);
  const [bookingData, setBookingData] = useState(null);
  let navigate = useNavigate()
  const { getCurrentUser } = useContext(userDataCotext);
  const { getListing } = useContext(listingDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [booking, setBooking] = useState(false)

  // ✅ Fixed function
  const handleBooking = async (id, rent) => {
    setBooking(true)
    if (!id) {
      console.error("❌ ID missing in handleBooking!");
      return;
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/booking/create/${id}`,
        {
          checkIn,
          checkOut,
          rent,
          totalRent: total,
        },
        { withCredentials: true }
      );

      await getCurrentUser();
      await getListing();
      setBooking(false)
      setBookingData(result.data);
       navigate("/booked")
       toast.success("Booking is success")
      console.log("✅ Booking created successfully:", result.data);
    } catch (error) {
      setBooking(false)
      toast.error(error?.response?.data?.message || error.message)
      console.error("❌ Booking error:", error.response?.data || error.message);
      setBookingData(null);
    }
  };

   const cancelBooking = async (id) => {
    if (!id) {
      console.error("❌ ID missing in cancle Booking!");
      return;
    }

    try {
      const result = await axios.delete(`${serverUrl}/api/booking/cancel/${id}`, { withCredentials: true });
      await getCurrentUser();
      await getListing();
     toast.success("Cancel Booking Successfully")
      console.log(result.data);
      setCheckIn(null)
      setCheckOut(null)
     
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
      console.error("❌ cancel Booking error:", error.response?.data || error.message);
      
    }
  };
  const value = {
    checkIn,
    checkOut,
    setCheckIn,
    setCheckOut,
    night,
    setNight,
    total,
    setTotal,
    bookingData,
    setBookingData,
    handleBooking,
    cancelBooking,
    booking, setBooking
  };

  return (
    <bookingDataConetext.Provider value={value}>
      {children}
    </bookingDataConetext.Provider>
  );
}

export default BookingContex;
