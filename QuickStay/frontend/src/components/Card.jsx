import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaStar } from "react-icons/fa6";
import { GiConfirmed } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { HiOutlineMapPin } from 'react-icons/hi2';
import { bookingDataConetext } from '../context/BookingContext';
import { listingDataContext } from '../context/ListingContext';
import { userDataCotext } from '../context/UserContext';

function Card({ title, landMark, image1, image2, image3, rent, city, id, ratings, isBooked, host, guest }) {
  const { userData } = useContext(userDataCotext)
  const { handleViewCrad } = useContext(listingDataContext)
  const navigate = useNavigate()
  const [canceleBooking, setCanceleBooking] = useState(false)
  const { cancelBooking } = useContext(bookingDataConetext)

  const handleClick = () => {
    if (userData) {
      handleViewCrad(id)
    } else {
      navigate("/login")
    }
  }

  return (
    <article
      className="group animate-rise relative flex min-h-[430px] w-full cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_18px_60px_rgba(22,32,28,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(22,32,28,0.16)] sm:max-w-[360px]"
    onClick={handleClick}
    >
      <div className="relative h-[275px] overflow-hidden bg-stone-100">
        <div className="hide-scrollbar flex h-full w-full overflow-x-auto scroll-smooth">
          {[image1, image2, image3].map((image, index) => (
            <img key={index} src={image} alt={title} className="h-full w-full flex-shrink-0 object-cover transition duration-500 group-hover:scale-105" />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-stone-800 shadow-lg backdrop-blur">
          {city}
        </div>

        <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-sm font-black text-stone-900 shadow-lg">
          <FaStar className="text-yellow-400" />
          {ratings || 0}
        </div>

        {isBooked && (
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-black text-white shadow-lg">
            <GiConfirmed size={16} /> Booked
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <div className="mb-2 flex items-center gap-1 text-sm font-bold text-stone-500">
            <HiOutlineMapPin className="text-orange-500" />
            <span className="truncate">{landMark}, {city}</span>
          </div>
          <h3 className="line-clamp-2 min-h-[56px] text-xl font-black leading-7 tracking-tight text-stone-950">{title}</h3>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-stone-400">From</div>
            <div className="text-2xl font-black text-stone-950">Rs. {rent}<span className="text-sm font-bold text-stone-500"> / day</span></div>
          </div>
          <button className="rounded-full bg-stone-950 px-4 py-2 text-sm font-black text-white hover:bg-orange-600">
            View
          </button>
        </div>
      </div>

      {isBooked && (guest === userData?._id || host === userData?._id) && (
        <button
          onClick={(e) => { e.stopPropagation(); setCanceleBooking((prev) => !prev) }}
          className="absolute left-4 top-[58px] flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-black text-red-600 shadow-lg"
        >
          <MdCancel size={16} /> {guest === userData?._id ? 'Cancel Booking' : 'Cancel by owner'}
        </button>
      )}

      {canceleBooking && (
        <div onClick={(e) => e.stopPropagation()} className="absolute inset-x-5 top-24 rounded-3xl border border-red-100 bg-white/95 p-5 text-center shadow-2xl backdrop-blur">
          <h4 className="text-lg font-black text-stone-950">Cancel booking?</h4>
          <p className="mt-1 text-sm text-stone-500">This action will release the stay for other guests.</p>
          <div className="mt-4 flex justify-center gap-3">
            <button onClick={() => { cancelBooking(id); setCanceleBooking(false) }} className="rounded-full bg-red-500 px-5 py-2 text-sm font-black text-white hover:bg-red-600">Yes</button>
            <button onClick={() => setCanceleBooking(false)} className="rounded-full border border-stone-200 px-5 py-2 text-sm font-black text-stone-700 hover:bg-stone-50">No</button>
          </div>
        </div>
      )}
    </article>
  )
}

export default Card
