import express from "express";
import { canceleBooking, createBooking } from "../controllers/booking.controller.js";
import isAuth from "../middlewares/isAuth.js";
const bookingRouter = express.Router()

bookingRouter.post("/create/:id",isAuth, createBooking)
bookingRouter.delete("/cancel/:id",isAuth, canceleBooking)




export default bookingRouter