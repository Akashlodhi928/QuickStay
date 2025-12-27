import React, { useContext, useState } from 'react'
import { GiConfirmed } from "react-icons/gi";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Star from '../components/Star';
import axios from 'axios';
import { bookingDataConetext } from '../context/BookingContext';
import { authDataContext } from '../context/AuthContext';
import { userDataCotext } from '../context/UserContext';
import { listingDataContext } from '../context/ListingContext';

function Booked() {
    let {bookingData} = useContext(bookingDataConetext)
    let navigate = useNavigate()
    let  [star, setStar] = useState(null)
    let {serverUrl} = useContext(authDataContext)
    let {getCurrentUser} = useContext(userDataCotext)
    let {getListing} = useContext(listingDataContext)
    let {cardDetails} = useContext(listingDataContext)

    const handleRating = async (id) => {
        try {
            let result = await axios.post(serverUrl +`/api/listing/ratings/${id}`,{
                ratings:star
            },{withCredentials:true})
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
       console.log("you rated" , value)
    }

    return (
        <div className='w-full flex-col gap-[20px] min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex items-center justify-center p-4'>
            <div className='w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>
                
                {/* ✅ Header with Icon */}
                <div className='w-full bg-green-500 flex flex-col items-center justify-center py-8'>
                    <GiConfirmed size={80} className='text-white animate-bounce' />
                    <h1 className='mt-4 text-white text-2xl sm:text-3xl font-bold tracking-wide'>Booking Confirmed</h1>
                </div>

                {/* ✅ Booking Details */}
                <div className='p-6 flex flex-col gap-5'>
                    <div className='flex justify-between items-center text-gray-700 text-base sm:text-lg'>
                        <span className='font-medium'>Booking ID:</span>
                        <span className='font-semibold text-gray-900'>{bookingData?._id || 'N/A'}</span>
                    </div>

                    <div className='flex justify-between items-center text-gray-700 text-base sm:text-lg'>
                        <span className='font-medium'>Owner Email:</span>
                        <span className='font-semibold text-gray-900'>{bookingData?.host?.email || 'N/A'}</span>
                    </div>

                    <div className='flex justify-between items-center text-gray-700 text-base sm:text-lg'>
                        <span className='font-medium'>Total Rent:</span>
                        <span className='font-semibold text-gray-900'>₹{bookingData?.totalRent || '0'}</span>
                    </div>

                    <button 
                        onClick={()=>navigate("/")} 
                        className='mt-6 w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-lg'
                    >
                        Back to Home
                    </button>
                </div>
            </div>

            <div className='w-[95%] max-w-[600px] h-[180px] flex bg-white flex-col items-center justify-center gap-[20px] md:w-[80%] rounded-lg'>
                <h1 className='text-[18px] font-semibold'>{star} out of 5 Ratings</h1>
                  <Star onRate={handleStar} />
                <button onClick={()=>handleRating(cardDetails?._id)} className='px-[30px] py-[10px] bg-red-500 text-white md:px-[100px] rounded-lg text-nowrap font-semibold'>
                   Submit
                </button>
            </div>
        </div>
    )
}

export default Booked
