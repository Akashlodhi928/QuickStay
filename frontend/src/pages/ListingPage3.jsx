import React, { useContext } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { listingDataContext } from '../context/ListingContext'

function ListingPage3() {
  const navigate = useNavigate()

  let {
    title, description,
    frontEndImage1, frontEndImage2, frontEndImage3,
    rent, city, landMark, category,handleAddListing,
    adding, setAdding
  } = useContext(listingDataContext)

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-start py-10 relative">

      {/* 🔙 Back Button */}
      <div
        className="absolute top-5 left-5 bg-white shadow-md hover:shadow-lg transition-all p-3 rounded-full cursor-pointer"
        onClick={() => navigate("/listingpage2")}
      >
        <FaArrowLeftLong className="text-2xl text-gray-700 hover:text-red-500 transition-all" />
      </div>

      {/* 📍 Location Heading */}
      <div className="w-[95%] md:w-[80%] mb-8 text-center md:text-left">
        <h1 className="text-[22px] md:text-[32px] font-semibold text-gray-800 truncate">
          In <span className="text-red-500">{landMark?.toUpperCase()}</span>, {city?.toUpperCase()}
        </h1>
      </div>

      {/* 🏠 Images Section */}
      <div className="w-[95%] md:w-[80%] flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
        
        {/* Main Image */}
        <div className="w-full md:w-[65%] rounded-2xl overflow-hidden shadow-lg hover:scale-[1.01] transition-transform duration-200">
          <img
            src={frontEndImage1}
            alt=""
            className="w-full h-[260px] sm:h-[350px] md:h-[400px] object-cover"
          />
        </div>

        {/* Side Images */}
        <div className="w-full md:w-[30%] flex md:flex-col gap-4">
          <div className="w-1/2 md:w-full rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
            <img
              src={frontEndImage2}
              alt=""
              className="w-full h-[180px] md:h-[190px] object-cover"
            />
          </div>
          <div className="w-1/2 md:w-full rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
            <img
              src={frontEndImage3}
              alt=""
              className="w-full h-[180px] md:h-[190px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* 🏡 Listing Info */}
      <div className="w-[95%] md:w-[80%] bg-white shadow-lg rounded-2xl p-6 md:p-8 flex flex-col gap-5 text-center md:text-left">
        
        <h2 className="text-[20px] md:text-[28px] font-bold text-gray-800 tracking-wide">
          {title?.toUpperCase()} — <span className="text-red-500">{category?.toUpperCase()}</span>
        </h2>

        <p className="text-gray-600 text-[15px] md:text-[18px] leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2">
          <p className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-4 sm:mb-0">
            ₹{rent}/day
          </p>

          <button onClick={handleAddListing} disabled={adding} className="px-12 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-[17px] md:text-[20px]">
            {adding?"adding....":"Add Listing"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListingPage3
