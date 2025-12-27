import React, { useContext, useState } from 'react'
import { FaArrowLeftLong, FaS, FaStar } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { ImCross } from "react-icons/im";
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { authDataContext } from '../context/AuthContext';
import { listingDataContext } from '../context/ListingContext';
import { bookingDataConetext } from '../context/BookingContext';
import { userDataCotext } from '../context/UserContext';

function ViewCrad() {

const navigate = useNavigate()

let {cardDetails,getListing} = useContext(listingDataContext)
let {userData} = useContext(userDataCotext)
let [updatePopUp, setUpdatePopUp] = useState(false)
const [bookingPopUp, setBookingPopUp] = useState(false)
 const [title, setTitle] = useState(cardDetails.title)
  const [description, setDescription] = useState(cardDetails.description)
  const [backEndImage1, setBackEndImage1] = useState(null)
  const [backEndImage2, setBackEndImage2] = useState(null)
  const [backEndImage3, setBackEndImage3] = useState(null)
  const [rent, setRent] = useState(cardDetails.rent)
  const [city, setCity] = useState(cardDetails.city)
  const [landMark, setLandMark] = useState(cardDetails.landMark)
  const { serverUrl } = useContext(authDataContext)
  let {updating, setUpdating,deleteing, setDeleteing} = useContext(listingDataContext)
  let [minDate,setMinDate] = useState("")
  const [airbnbCharge, setAirbnbCharge] = useState(0);
  const [tax, setTax] = useState(0);
 

   let  {
        checkIn,checkOut,
        night,setNight,
        total,setTotal,setCheckIn,setCheckOut,
        // bookingData , setBookingData,
        handleBooking,booking, setBooking
    } = useContext(bookingDataConetext)

useEffect(() => {
  if (checkIn && checkOut) {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const n = (outDate - inDate) / (24 * 60 * 60 * 1000);

    if (n > 0) {
      setNight(n);

      const rentPerDay = Number(cardDetails.rent); // ensure it's a number
      const newAirbnbCharge = rentPerDay * n * 0.07; // 7% of total stay
      const newTax = rentPerDay * n * 0.07; // 7% of total stay
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
}, [checkIn, checkOut, cardDetails.rent]);


  


   const handleImage1 = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackEndImage1(file);
    }
  };

  const handleImage2 = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackEndImage2(file);
    }
  };

  const handleImage3 = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackEndImage3(file);
    }
  };

  const handleDeleteListing = async ()=>{
    setDeleteing(true)
    try {
      const result = await axios.delete(serverUrl + `/api/listing/delete/${cardDetails._id}`, 
        {withCredentials: true})
        console.log("deleted Listing successfully")
        console.log(result.data)
        setDeleteing(false)
        navigate("/")
        toast.success("Listing is Deleted")
    } catch (error) {
      setDeleteing(FaS)
      toast.error(error?.response?.data?.message || error.message)
      console.log(error)
    }
  }

  const handleUpdateListing = async ()=>{
    setUpdating(true)
     try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("rent", rent)
      formData.append("city", city)
      formData.append("landMark", landMark)
      if (backEndImage1){ formData.append("image1", backEndImage1)}
      if (backEndImage2 ){ formData.append("image2", backEndImage2)}
      if (backEndImage3 ){ formData.append("image3", backEndImage3)}

      const result = await axios.post(serverUrl + `/api/listing/update/${cardDetails._id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      setUpdating(false)
      console.log("✅ Update Listing successfully:", result.data)
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
      console.error("❌ update listing:", error)
    }
  }

  
  useEffect(()=>{
    let today = new Date().toISOString().split('T')[0]
    setMinDate(today)
  },[])



 

  return (
     <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-start py-10 relative">
    
          {/* 🔙 Back Button */}
          <div
            className="absolute top-5 left-5 bg-white shadow-md hover:shadow-lg transition-all p-3 rounded-full cursor-pointer"
            onClick={() => navigate("/")}
          >
            <FaArrowLeftLong className="text-2xl text-gray-700 hover:text-red-500 transition-all" />
          </div>
    
          {/* 📍 Location Heading */}
          <div className="w-[95%] md:w-[80%] mb-4 text-center md:text-left ml-[40px]">
            <h1 className="text-[22px] md:text-[32px] font-semibold text-gray-800 truncate">
              In <span className="text-red-500">{cardDetails.landMark.toUpperCase()}</span>, {cardDetails.city.toUpperCase()}
            </h1>
          </div>
    
          {/* 🏠 Images Section */}
          <div className="w-[95%] md:w-[80%] p-5 rounded-lg shadow-lg shadow-gray-200 flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            
            {/* Main Image */}
            <div className="w-full md:w-[65%] rounded-2xl overflow-hidden shadow-lg hover:scale-[1.01] transition-transform duration-200">
              <img
                src={cardDetails.image1}
                alt=""
                className="w-full h-[260px] sm:h-[350px] md:h-[400px] object-cover"
              />
            </div>
    
            {/* Side Images */}
            <div className="w-full md:w-[30%] flex md:flex-col gap-4">
              <div className="w-1/2 md:w-full rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
                <img
                  src={cardDetails.image2}
                  alt=""
                  className="w-full h-[180px] md:h-[190px] object-cover"
                />
              </div>
              <div className="w-1/2 md:w-full rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
                <img
                  src={cardDetails.image3}
                  alt=""
                  className="w-full h-[180px] md:h-[190px] object-cover"
                />
              </div>
            </div>
          </div>
    
          {/* 🏡 Listing Info */}
          <div className="w-[95%] md:w-[80%]  shadow-lg rounded-2xl  md:p-8 flex flex-col gap-2 text-center md:text-left">
            
            <h2 className="text-[20px] md:text-[28px] font-bold text-gray-800 tracking-wide">
              {cardDetails.title.toUpperCase()} — <span className="text-red-500">{cardDetails.category?.toUpperCase()}</span>
            </h2>
    
            <p className="text-gray-600 text-[15px] md:text-[18px] leading-relaxed">
              {cardDetails.description}
            </p>
    
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2">
              <p className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-4 sm:mb-0">
                ₹{cardDetails.rent}/day
              </p>
    
           <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
            {cardDetails.host == userData._id &&<button
                className="w-full sm:w-auto px-6 sm:px-10 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px]"
             onClick={()=>setUpdatePopUp(prev => !prev)}>
                Edit Listing
            </button>}

            {cardDetails.host == userData._id &&<button
            onClick={handleDeleteListing}
            disabled={deleteing}
                className="w-full sm:w-auto px-6 sm:px-10 py-3 bg-red-500 hover:bg-red-700 text-white font-medium rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px]"
             >
                {deleteing?"Deleting":"Delete Listing"}
            </button>}

           { cardDetails.host != userData._id && <button
           onClick={()=>setBookingPopUp(prev=> !prev)}
                className="w-full sm:w-auto px-6 sm:px-10 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px]"
            >
                Booking House
            </button>}
            </div>

            </div>
          </div>

          {/* updates Listing page  */}
                {updatePopUp && (
                <div className="w-[100%] h-[100%] flex items-center justify-center bg-[#000000a9] absolute top-[0px] z-[100] backdrop-blur-sm">
                    <div className="absolute top-5 left-5 bg-white shadow-md hover:shadow-lg transition-all p-3 rounded-full cursor-pointer"
                       onClick={() => setUpdatePopUp(false)} >
                        < ImCross className="text-2xl text-red-500 hover:text-gray-700 transition-all" />
                    </div>

      <form onSubmit={(e)=>{e.preventDefault()}}
        className="shadow-lg shadow-gray-400  text-white  max-w-[900px] w-[90%] h-[750px] mt-[20px] flex items-center justify-center 
          flex-col  gap-[10px] bg-[#2c2e2f] rounded-2xl overflow-auto ml-[80px]"
      >
        <div className="w-[180px] h-[40px] bg-red-500 font-bold text-white flex items-center justify-center rounded-[30px] absolute top-[20px] right-[30px] shadow-lg">
          Edit Your Home
        </div>

        {/* ✅ Title */}
        <div className="w-[90%] flex flex-col gap-[5px]">
          <label htmlFor="title" className="text-[20px]">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter Your Title"
            className="w-[90%] h-[40px] border-[2px] border-gray-400 rounded-md px-3 text-[18px] text-white"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* ✅ Description */}
        <div className="w-[90%] flex flex-col gap-[5px]">
          <label htmlFor="description" className="text-[20px]">Description</label>
          <textarea
            id="description"
            className="w-[90%] h-[80px] border-[2px] border-gray-400 rounded-md px-3 text-[18px] text-white"
            required
            placeholder='Enter Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* ✅ Image 1 */}
        <div className="w-[90%] flex flex-col gap-[5px]">
          <label htmlFor="image1" className="text-[20px]">Image 1</label>
          <input
            id="image1"
            type="file"
            accept="image/*"
            className="w-[90%] border border-gray-400 rounded-md px-3 text-[18px]"
            onChange={handleImage1}
            required
          />
        </div>

        {/* ✅ Image 2 */}
        <div className="w-[90%] flex flex-col gap-[5px]">
          <label htmlFor="image2" className="text-[20px]">Image 2</label>
          <input
            id="image2"
            type="file"
            accept="image/*"
            className="w-[90%] border border-gray-400 rounded-md px-3 text-[18px]"
            onChange={handleImage2}
            required
          />
        </div>

        {/* ✅ Image 3 */}
        <div className="w-[90%] flex flex-col gap-[5px]">
          <label htmlFor="image3" className="text-[20px]">Image 3</label>
          <input
            id="image3"
            type="file"
            accept="image/*"
            className="w-[90%] border border-gray-400 rounded-md px-3 text-[18px]"
            onChange={handleImage3}
            required
          />
        </div>

        {/* ✅ Rent */}
        <div className="w-[90%] flex flex-col gap-[5px]">
          <label htmlFor="rent" className="text-[20px]">Rent</label>
          <input
            id="rent"
            type="number"
            placeholder="Enter Rent per day...."
            className="w-[90%] h-[40px] border-[2px] border-gray-400 rounded-md px-3 text-[18px]"
            required
            value={rent}
            onChange={(e) => setRent(e.target.value)}
          />
        </div>

        {/* ✅ City */}
        <div className="w-[90%] flex flex-col gap-[5px]">
          <label htmlFor="city" className="text-[20px]">City</label>
          <input
            id="city"
            type="text"
            placeholder="Enter Your City"
            className="w-[90%] h-[40px] border-[2px] border-gray-400 rounded-md px-3 text-[18px]"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* ✅ Landmark */}
        <div className="w-[90%] flex flex-col gap-[5px]">
          <label htmlFor="landmark" className="text-[20px]">Landmark</label>
          <input
            id="landmark"
            type="text"
            placeholder="Enter Your Landmark"
            className="w-[90%] h-[40px] border-[2px] border-gray-400 rounded-md px-3 text-[18px]"
            required
            value={landMark}
            onChange={(e) => setLandMark(e.target.value)}
          />
        </div>

        {/* ✅ Next Button */}
        <button onClick={handleUpdateListing}
          type="submit"
          disabled={updating}
          className="px-[50px] py-[8px] bg-red-500 text-white rounded-md font-bold md:px-[100px] mt-[8px]"
        >
          {updating?"Updating.....":"Update Listing"}
        </button>
      </form>
                </div> )}

        {bookingPopUp && <div className="w-[100%] h-[100%] flex-col gap-10 flex items-center justify-center gap-[30px bg-[#000000a9] absolute top-[0px]
         p-[20px] md:flex-row md:gap-[100px] z-[100] backdrop-blur-sm">
             <div className="absolute top-5 left-5 bg-white shadow-md hover:shadow-lg transition-all p-3 rounded-full cursor-pointer"
                       onClick={() => setBookingPopUp(false)} >
                        < ImCross className="text-2xl text-red-500 hover:text-gray-700 transition-all"  onClick={() => setBookingPopUp(false)} />
                </div>

  
                <form onSubmit={(e)=>{
                  e.preventDefault()
                  }} className='max-w-[450px] w-[90%] h-[450px] overflow-auto bg-slate-100 p-[20px] rounded-lg flex items-center justify-start flex-col gap-[10px] border-[1px] border-gray-300'>
                  <h1 className='text-[25px] border-b-[2px] w-[100%] overflow-hidden text-center border-gray-700 py-[10px]'>Confirm & Book</h1>

                  <div className='w-[100%] h-[70%]  mt-[10px] rounded-lg p-[10px]'>
                    <h3 className='text-[19px] font-semibold w-full text-center'> ----- Your Trip ----</h3>
                     <div className="w-[90%] flex  gap-[15px] justify-center items-center mt-[30px] ml-[15px]">
                        <label htmlFor="landmark" className="text-[20px]">checkIn</label>
                        <input
                          id="landmark"
                          type="date"
                          min={minDate}
                          placeholder="Enter Your Landmark"
                          className="w-[90%] h-[40px] border-[2px] border-gray-400 rounded-md px-3 text-[18px] cursor-pointer"
                          require onChange={(e)=>setCheckIn(e.target.value)} value={checkIn} />
                      </div>
                      
                      <div className="w-[90%] flex  gap-[15px] justify-center items-center mt-[25px] ml-[15px]">
                        <label htmlFor="landmark" className="text-[20px]">checkOut</label>
                        <input
                          id="landmark"
                          type="date"
                          min={minDate}
                          placeholder="Enter Your Landmark"
                          className="w-[90%] h-[40px] border-[2px] border-gray-400 rounded-md px-3 text-[18px] cursor-pointer"
                          require  onChange={(e)=>setCheckOut(e.target.value)} value={checkOut} />
                      </div>

                      <button disabled={booking} onClick={() => handleBooking(cardDetails._id, cardDetails.rent)} 
                      type="submit"className="px-[40px] cursor-pointer py-[8px] mt-[30px] ml-[60px] bg-red-500 text-white rounded-md font-bold md:px-[100px] mt-[8px]" >
                          {booking?"Booking....":"Book Now"}
                       </button>
                  </div>
                </form>

                 <div className='max-w-[450px] w-[90%] h-[450px] bg-slate-100  p-[20px] rounded-lg flex items-center justify-center flex-col gap-[10px] border-[1px] border-gray-400'>
                   <div className='w-[95%] h-[30%] border-[2px] border-gray-700 rounded-lg flex justify-center items-center gap-[8px] p-[20px] overflow-hidden'>
                      <div className='w-[70px] h-[90%] flex items-center justify-center flex-shrink-0 rounded-lg md:w-[100px] md:h-[100px]'>

                        <img className='w-[100%] h-[100%]  rounded-lg' src={cardDetails.image1} alt="" /></div>

                        <div className='w-[80%] h-[100px gap-[5px]] ml-[10px]'>
                          <h1 className='w-[90%] truncate uppercase'>
                            {`In ${cardDetails.landMark}, ${cardDetails.city}`}
                          </h1>
                          <h1 className='uppercase'>
                            {cardDetails.title}
                          </h1>
                          <h1 className='uppercase'>
                            {cardDetails.category}
                          </h1>
                          <h1 className='flex items-center justify-start gap-[5px] '>
                              <FaStar className='text-yellow-400' /> {cardDetails.ratings}
                          </h1>
                        </div>

                   </div>
                        <div className='w-[95%] h-[60%] border-[2px] border-gray-500 rounded-lg flex justify-start items-start p-[20px] gap-[15px] flex-col'>
                            <h1 className='font-semibold'>Booking Price - </h1>
                           <p className='flex justify-between items-center px-5 w-full whitespace-nowrap'>
                              <span className='font-semibold'>
                                {`${cardDetails.rent} x ${night} nights :-` } 
                              </span>

                              <span className='font-semibold'>{cardDetails.rent*night}</span>
                            </p>

                             <p className='flex justify-between items-center px-5 w-full whitespace-nowrap'>
                              <span className='font-semibold'>
                                Airbnb Charge :-
                              </span>

                              <span className='font-semibold'>{airbnbCharge}</span>
                            </p>

                             <p className='flex justify-between items-center px-5 w-full whitespace-nowrap border-b-[2px] border-gray-400 pb-[10px]'>
                              <span className='font-semibold'>
                                Tax :-
                              </span>

                              <span className='font-semibold'>{tax}</span>
                            </p>

                             <p className='flex justify-between items-center px-2 w-full whitespace-nowrap '>
                              <span className='font-bold text-red-700 text-lg'>
                                Total :-
                              </span>

                              <span className='font-bold text-red-700 text-lg'>{total}</span>
                            </p>

                            
                        </div>

                </div>


        </div>}



    </div>
  )
}

export default ViewCrad

