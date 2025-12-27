import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthCotext from "./context/AuthContext.jsx";
import ListingContext from "./context/ListingContext.jsx";
import UserContext from "./context/UserContext.jsx";
import BookingContex from "./context/BookingContext.jsx";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthCotext>
      <ListingContext>
        <UserContext>
          <BookingContex
          >
          <App />
          </BookingContex>
        </UserContext>
      </ListingContext>
    </AuthCotext>
  </BrowserRouter>
);
