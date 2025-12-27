import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()
import cookie from "cookie-parser"
import genToken from "../config/token.js";


export const signUp = async(req,res)=>{
    try {
        let {name, email, password} = req.body;
        let existUser = await User.findOne({email})

        if(existUser){
            return res.status(404).json({message:"user already exist you can login"})
        }

        let hashPassword = await bcrypt.hash(password,12)

        let user = await User.create({
            name,
            email,
            password:hashPassword
        })

        let token = await genToken(user._id)

        res.cookie("token",token ,{
            httpOnly:true,
            secure:process.env.NODE_ENVIREMONT = "production",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.status(404).json({message:`error in auth signup ${error}`})
    }
}


export const login = async(req,res)=>{
    try {
        let { email, password} = req.body;
        

        let user = await User.findOne({email}).populate("listing","title image1 image2 image3 description rent category landMark city  ")

        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(404).json({message:"Invalid password"})
        }

        let token = await genToken(user._id)
        res.cookie("token",token ,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.status(404).json({message:`error in auth login ${error}`})
    }
}

export const logOut = async(req,res)=>{
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            })
        return res.status(200).json({message:"LogOut SuccessFully"})
    } catch (error) {
        return res.status(404).json({message:`error in auth LogOut ${error}`})
    }
}