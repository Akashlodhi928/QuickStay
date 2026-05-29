/* eslint-disable react-hooks/set-state-in-effect */
import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeftLong, FaStar } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import { ImCross } from "react-icons/im";
import axios from 'axios'
import { toast } from 'react-toastify'
import { HiOutlineCalendarDays, HiOutlineHomeModern, HiOutlineMapPin, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import { authDataContext } from '../context/AuthContext';
import { listingDataContext } from '../context/ListingContext';
import { bookingDataConetext } from '../context/BookingContext';
import { userDataCotext } from '../context/UserContext';

function ViewCrad() {
const navigate = useNavigate()
const { id } = useParams()
const { cardDetails, setCardDetails, updating, setUpdating, deleteing, setDeleteing } = useContext(listingDataContext)
  const { userData } = useContext(userDataCotext)
  const [updatePopUp, setUpdatePopUp] = useState(false)
  const [bookingPopUp, setBookingPopUp] = useState(false)
  const [title, setTitle] = useState(cardDetails?.title || "")
  const [description, setDescription] = useState(cardDetails?.description || "")
  const [backEndImage1, setBackEndImage1] = useState(null)
  const [backEndImage2, setBackEndImage2] = useState(null)
  const [backEndImage3, setBackEndImage3] = useState(null)
  const [rent, setRent] = useState(cardDetails?.rent || "")
  const [city, setCity] = useState(cardDetails?.city || "")
  const [landMark, setLandMark] = useState(cardDetails?.landMark || "")
  const { serverUrl } = useContext(authDataContext)


  const [minDate] = useState(() => new Date().toISOString().split('T')[0])
  const [airbnbCharge, setAirbnbCharge] = useState(0);
  const [tax, setTax] = useState(0);

  useEffect(() => {
  const fetchListing = async () => {
    if (!id) return

    if (cardDetails?._id === id) return

    try {
      const result = await axios.get(`${serverUrl}/api/listing/findlistingbyid/${id}`, {
        withCredentials: true,
      })
      setCardDetails(result.data)
    } catch (error) {
      console.log(error)
      toast.error("Unable to load listing")
      navigate("/")
    }
  }

  fetchListing()
}, [id, cardDetails?._id, serverUrl, setCardDetails, navigate])

  const {
    checkIn, checkOut,
    night, setNight,
    total, setTotal, setCheckIn, setCheckOut,
    handleBooking, booking
  } = useContext(bookingDataConetext)

  useEffect(() => {
    if (cardDetails) {
      setTitle(cardDetails.title || "")
      setDescription(cardDetails.description || "")
      setRent(cardDetails.rent || "")
      setCity(cardDetails.city || "")
      setLandMark(cardDetails.landMark || "")
    }
  }, [cardDetails])

  useEffect(() => {
    if (!cardDetails) return
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const n = (outDate - inDate) / (24 * 60 * 60 * 1000);

      if (n > 0) {
        setNight(n);
        const rentPerDay = Number(cardDetails.rent);
        const newAirbnbCharge = rentPerDay * n * 0.07;
        const newTax = rentPerDay * n * 0.07;
        const newTotal = rentPerDay * n + newAirbnbCharge + newTax;
        setAirbnbCharge(newAirbnbCharge);
        setTax(newTax);
        setTotal(newTotal);
      } else {
        setNight(0);
        setAirbnbCharge(0);
        setTax(0);
        setTotal(0);
      }
    } else {
      setNight(0);
      setAirbnbCharge(0);
      setTax(0);
      setTotal(0);
    }
  }, [checkIn, checkOut, cardDetails]);

  const handleImage1 = (e) => setBackEndImage1(e.target.files?.[0] || null)
  const handleImage2 = (e) => setBackEndImage2(e.target.files?.[0] || null)
  const handleImage3 = (e) => setBackEndImage3(e.target.files?.[0] || null)

  const handleDeleteListing = async () => {
    setDeleteing(true)
    try {
      const result = await axios.delete(serverUrl + `/api/listing/delete/${cardDetails._id}`, { withCredentials: true })
      console.log("deleted Listing successfully")
      console.log(result.data)
      setDeleteing(false)
      navigate("/")
      toast.success("Listing is Deleted")
    } catch (error) {
      setDeleteing(false)
      toast.error(error?.response?.data?.message || error.message)
      console.log(error)
    }
  }

  const handleUpdateListing = async () => {
    setUpdating(true)
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("rent", rent)
      formData.append("city", city)
      formData.append("landMark", landMark)
      if (backEndImage1) formData.append("image1", backEndImage1)
      if (backEndImage2) formData.append("image2", backEndImage2)
      if (backEndImage3) formData.append("image3", backEndImage3)

      const result = await axios.post(serverUrl + `/api/listing/update/${cardDetails._id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      setUpdating(false)
      console.log("Update Listing successfully:", result.data)
      setTitle("")
      setDescription("")
      setBackEndImage1("")
      setBackEndImage2("")
      setBackEndImage3("")
      setRent("")
      setCity("")
      setLandMark("")
      toast.success("Listing is Updated")
      navigate("/")
    } catch (error) {
      setUpdating(false)
      toast.error(error?.response?.data?.message || error.message)
      console.error("update listing:", error)
    }
  }

  if (!cardDetails) {
    return (
      <div className="page-shell flex items-center justify-center px-4">
        <div className="soft-card max-w-md rounded-[2rem] p-8 text-center">
          <HiOutlineHomeModern className="mx-auto mb-4 text-5xl text-orange-500" />
          <h1 className="text-2xl font-black text-stone-950">Listing not loaded</h1>
          <button onClick={() => navigate("/")} className="primary-gradient mt-6 h-12 rounded-2xl px-8 font-black text-white">Back to Home</button>
        </div>
      </div>
    )
  }

  const isOwner = cardDetails.host === userData?._id
  const inputClass = "h-12 rounded-2xl border border-stone-200 bg-white px-4 text-base text-stone-900 shadow-sm";

  return (
    <div className="page-shell px-4 py-8">
      <button className="fixed left-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white shadow-lg" onClick={() => navigate("/")}>
        <FaArrowLeftLong className="text-xl text-stone-800" />
      </button>

      <main className="mx-auto w-full max-w-7xl pt-16">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-orange-700">{cardDetails.category}</span>
              <span className="flex items-center gap-1 text-sm font-bold text-stone-500"><HiOutlineMapPin className="text-orange-500" /> {cardDetails.landMark}, {cardDetails.city}</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-stone-950 md:text-5xl">{cardDetails.title}</h1>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-stone-800 shadow-sm">
            <FaStar className="text-yellow-400" /> {cardDetails.ratings || 0}
          </div>
        </div>

        <section className="soft-card overflow-hidden rounded-[2.2rem]">
          <div className="grid gap-3 p-3 md:grid-cols-[1.35fr_0.8fr]">
            <img src={cardDetails.image1} alt={cardDetails.title} className="h-[320px] w-full rounded-[1.6rem] object-cover md:h-[540px]" />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
              <img src={cardDetails.image2} alt={cardDetails.title} className="h-[190px] w-full rounded-[1.6rem] object-cover md:h-[263px]" />
              <img src={cardDetails.image3} alt={cardDetails.title} className="h-[190px] w-full rounded-[1.6rem] object-cover md:h-[263px]" />
            </div>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-[1fr_380px] md:p-8">
            <div>
              <h2 className="text-2xl font-black text-stone-950">About this stay</h2>
              <p className="mt-4 text-base leading-8 text-stone-600">{cardDetails.description}</p>
            </div>

            <aside className="h-fit rounded-[1.8rem] border border-stone-200 bg-stone-50 p-5 shadow-sm">
              <div className="text-sm font-bold uppercase tracking-[0.18em] text-stone-400">Price</div>
              <div className="mt-1 text-4xl font-black text-stone-950">Rs. {cardDetails.rent}<span className="text-base text-stone-500"> / day</span></div>

              <div className="mt-6 flex flex-col gap-3">
                {isOwner && (
                  <>
                    <button className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-stone-950 text-base font-black text-white hover:bg-orange-600" onClick={() => setUpdatePopUp((prev) => !prev)}>
                      <HiOutlinePencilSquare className="text-xl" /> Edit Listing
                    </button>
                    <button onClick={handleDeleteListing} disabled={deleteing} className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white text-base font-black text-red-600 hover:bg-red-50">
                      <HiOutlineTrash className="text-xl" /> {deleteing ? "Deleting..." : "Delete Listing"}
                    </button>
                  </>
                )}

                {!isOwner && (
                  <button onClick={() => setBookingPopUp((prev) => !prev)} className="primary-gradient flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-base font-black text-white shadow-lg shadow-red-500/20 hover:-translate-y-0.5">
                    <HiOutlineCalendarDays className="text-xl" /> Book House
                  </button>
                )}
              </div>
            </aside>
          </div>
        </section>
      </main>

      {updatePopUp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-sm">
          <button className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg" onClick={() => setUpdatePopUp(false)}>
            <ImCross className="text-lg text-red-500" />
          </button>

          <form onSubmit={(e) => e.preventDefault()} className="max-h-[88vh] w-full max-w-3xl overflow-auto rounded-[2rem] bg-white p-5 shadow-2xl sm:p-8">
            <h2 className="mb-6 text-3xl font-black text-stone-950">Edit your home</h2>
            <div className="grid gap-5">
              <label className="flex flex-col gap-2 text-sm font-bold text-stone-700" htmlFor="title">Title
                <input id="title" type="text" placeholder="Enter your title" className={inputClass} required value={title} onChange={(e) => setTitle(e.target.value)} />
              </label>
              <label className="flex flex-col gap-2 text-sm font-bold text-stone-700" htmlFor="description">Description
                <textarea id="description" className="min-h-[120px] rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base text-stone-900 shadow-sm" required placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </label>
              <div className="grid gap-4 md:grid-cols-3">
                <input id="image1" type="file" accept="image/*" className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm" onChange={handleImage1} />
                <input id="image2" type="file" accept="image/*" className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm" onChange={handleImage2} />
                <input id="image3" type="file" accept="image/*" className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm" onChange={handleImage3} />
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                <input id="rent" type="number" placeholder="Rent per day" className={inputClass} required value={rent} onChange={(e) => setRent(e.target.value)} />
                <input id="city" type="text" placeholder="City" className={inputClass} required value={city} onChange={(e) => setCity(e.target.value)} />
                <input id="landmark" type="text" placeholder="Landmark" className={inputClass} required value={landMark} onChange={(e) => setLandMark(e.target.value)} />
              </div>
              <button onClick={handleUpdateListing} type="submit" disabled={updating} className="primary-gradient h-12 rounded-2xl text-base font-black text-white shadow-lg shadow-red-500/20">
                {updating ? "Updating..." : "Update Listing"}
              </button>
            </div>
          </form>
        </div>
      )}

      {bookingPopUp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-sm">
          <button className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg" onClick={() => setBookingPopUp(false)}>
            <ImCross className="text-lg text-red-500" />
          </button>

          <div className="grid w-full max-w-5xl gap-5 md:grid-cols-2">
            <form onSubmit={(e) => e.preventDefault()} className="rounded-[2rem] bg-white p-6 shadow-2xl">
              <h2 className="text-3xl font-black text-stone-950">Confirm and book</h2>
              <p className="mt-2 text-sm leading-6 text-stone-500">Select your check-in and check-out dates.</p>

              <div className="mt-6 grid gap-4">
                <label className="flex flex-col gap-2 text-sm font-bold text-stone-700" htmlFor="checkIn">Check in
                  <input id="checkIn" type="date" min={minDate} className={inputClass} required onChange={(e) => setCheckIn(e.target.value)} value={checkIn} />
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold text-stone-700" htmlFor="checkOut">Check out
                  <input id="checkOut" type="date" min={minDate} className={inputClass} required onChange={(e) => setCheckOut(e.target.value)} value={checkOut} />
                </label>
              </div>

              <button disabled={booking} onClick={() => handleBooking(cardDetails._id, cardDetails.rent)} type="submit" className="primary-gradient mt-6 h-12 w-full rounded-2xl text-base font-black text-white shadow-lg shadow-red-500/20">
                {booking ? "Booking..." : "Book Now"}
              </button>
            </form>

            <aside className="rounded-[2rem] bg-white p-6 shadow-2xl">
              <div className="flex gap-4 rounded-3xl border border-stone-200 bg-stone-50 p-3">
                <img className="h-24 w-28 flex-shrink-0 rounded-2xl object-cover" src={cardDetails.image1} alt={cardDetails.title} />
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-black text-stone-950">{cardDetails.title}</h3>
                  <p className="mt-1 truncate text-sm font-semibold text-stone-500">{cardDetails.landMark}, {cardDetails.city}</p>
                  <p className="mt-2 flex items-center gap-1 text-sm font-black text-stone-700"><FaStar className="text-yellow-400" /> {cardDetails.ratings || 0}</p>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-stone-200 p-5">
                <h3 className="mb-4 text-lg font-black text-stone-950">Price details</h3>
                <div className="flex flex-col gap-3 text-sm font-semibold text-stone-600">
                  <p className="flex justify-between"><span>{cardDetails.rent} x {night} nights</span><span>Rs. {cardDetails.rent * night}</span></p>
                  <p className="flex justify-between"><span>Service charge</span><span>Rs. {airbnbCharge}</span></p>
                  <p className="flex justify-between border-b border-stone-200 pb-3"><span>Tax</span><span>Rs. {tax}</span></p>
                  <p className="flex justify-between text-lg font-black text-stone-950"><span>Total</span><span>Rs. {total}</span></p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewCrad
