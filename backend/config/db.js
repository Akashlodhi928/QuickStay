import mongoose  from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.DB_CONNECTION)
        console.log("mongoose is connected")
    } catch (error) {
        console.log("error in mongodb connection")
    }
}

export default connectDb