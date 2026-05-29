import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.route.js";
import listingRouter from "./routes/listing.route.js";
import bookingRouter from "./routes/booking.route.js";
import connectDb from "./config/db.js";

const app = express();
const port = process.env.PORT || 3000;

connectDb();

app.set("trust proxy", 1);

const allowedOrigins = [
  "https://quickstay-2-uyri.onrender.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);
app.use("/api/booking", bookingRouter);

app.listen(port, () => {
  console.log(`server is running on ${port} port`);
});