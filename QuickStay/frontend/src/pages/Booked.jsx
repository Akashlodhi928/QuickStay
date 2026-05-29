import React, { useContext, useState } from 'react'
import { GiConfirmed } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import Star from '../components/Star';
import axios from 'axios';
import { bookingDataConetext } from '../context/BookingContext';
import { authDataContext } from '../context/AuthContext';
import { userDataCotext } from '../context/UserContext';
import { listingDataContext } from '../context/ListingContext';

function Booked() {
  const { bookingData } = useContext(bookingDataConetext)
  const navigate = useNavigate()
  const [star, setStar] = useState(null)
  const { serverUrl } = useContext(authDataContext)
  const { getCurrentUser } = useContext(userDataCotext)
  const { getListing, cardDetails } = useContext(listingDataContext)

  const handleRating = async (id) => {
    try {
      const result = await axios.post(serverUrl + `/api/listing/ratings/${id}`, { ratings: star }, { withCredentials: true })
      await getListing()
      await getCurrentUser()
      console.log(result)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const handleStar = async (value) => {
    setStar(value)
    console.log("you rated", value)
  }

  return (
    <div className="page-shell flex items-center justify-center px-4 py-10">
      <main className="grid w-full max-w-5xl gap-5 md:grid-cols-[0.9fr_1.1fr]">
        <section className="soft-card overflow-hidden rounded-[2.2rem]">
          <div className="primary-gradient flex flex-col items-center justify-center px-6 py-12 text-white">
            <GiConfirmed size={82} className="animate-bounce" />
            <h1 className="mt-4 text-center text-3xl font-black tracking-tight">Booking Confirmed</h1>
            <p className="mt-2 text-center text-sm text-white/80">Your stay is reserved successfully.</p>
          </div>

          <div className="flex flex-col gap-4 p-6 text-sm">
            <p className="flex justify-between gap-4"><span className="font-bold text-stone-500">Booking ID</span><span className="truncate font-black text-stone-950">{bookingData?._id || 'N/A'}</span></p>
            <p className="flex justify-between gap-4"><span className="font-bold text-stone-500">Owner Email</span><span className="truncate font-black text-stone-950">{bookingData?.host?.email || 'N/A'}</span></p>
            <p className="flex justify-between gap-4"><span className="font-bold text-stone-500">Total Rent</span><span className="font-black text-stone-950">Rs. {bookingData?.totalRent || '0'}</span></p>
            <button onClick={() => navigate("/")} className="mt-4 h-12 rounded-2xl bg-stone-950 text-base font-black text-white hover:bg-orange-600">
              Back to Home
            </button>
          </div>
        </section>

        <section className="soft-card flex flex-col items-center justify-center rounded-[2.2rem] p-8 text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-600">Rate your stay</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">{star || 0} out of 5</h2>
          <div className="mt-6">
            <Star onRate={handleStar} />
          </div>
          <button onClick={() => handleRating(cardDetails?._id)} className="primary-gradient mt-8 h-12 w-full max-w-sm rounded-2xl text-base font-black text-white shadow-lg shadow-red-500/20">
            Submit Rating
          </button>
        </section>
      </main>
    </div>
  )
}

export default Booked
