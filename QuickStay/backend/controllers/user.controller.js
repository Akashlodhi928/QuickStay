import User from "../models/user.model.js"

export const getCurrentUser = async (req,res) => {
    try {
        let user = await User.findById(req.userId).select("-password").populate("listing","title image1 image2 image3 description rent category landMark city isBooked host ratings  ")
        .populate("booking","title image1 image2 image3 description rent category landMark city isBooked host ratings ")
        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        return res.status(200).json(user)
    } catch (error) {
         return res.status(404).json({message:`error in getCurrentUser ${error}`})
    }
}