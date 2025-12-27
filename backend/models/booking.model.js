import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

     host:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true
     },
       guest:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true
     },
     listing:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Listing",
         required:true
     },
      status:{
         type:String,
         enum:["booked", "cancle"],
         default:"booked"
     },
      checkIn:{
         type:Date,
         required:true
     },
      rent:{
         type:Number,
         required:true
     },
     checkOut:{
         type:Date,
         required:true
     },
     totalRent:{
         type:Number,
         required:true
     },
     ratings:{
        type:Number,
        min:0,
        max:5,
        default:0
     }
  
},{timestamps:true})

const Booking = mongoose.model("Booking", bookingSchema)
export default Booking