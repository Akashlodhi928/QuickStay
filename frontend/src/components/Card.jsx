import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaStar } from "react-icons/fa6";
import { GiConfirmed } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { bookingDataConetext } from '../context/BookingContext';
import { listingDataContext } from '../context/ListingContext';
import { userDataCotext } from '../context/UserContext';

function Card({title, landMark ,image1 , image2, image3, rent , city, id, ratings ,isBooked, host,guest}) {

    let {userData} = useContext(userDataCotext)
    let {handleViewCrad} = useContext(listingDataContext)
    const navigate = useNavigate()
    let [canceleBooking, setCanceleBooking] = useState(false)
   
    let {cancelBooking} = useContext(bookingDataConetext)

    const handleClick = ()=>{
        if(userData){
            handleViewCrad(id)
        }else{
            navigate("/login")
        }
    }
    
  return (
    <div className='w-[330px] max-w-[85%] h-[460px] flex items-start justify-start flex-col rounded-lg cursor-pointer relative ' onClick={()=>!isBooked?handleClick():null}>

        {isBooked && <div className='text-green-500 font-semibold bg-white rounded-lg absolute flex items-center justify-center right-1 top-1 gap-[5px] p-[5px]'>
           <GiConfirmed size={20} />Booked
        </div>}

      {isBooked && guest == userData?._id &&  <div onClick={()=>setCanceleBooking(prev => !prev)} className='text-red-500 font-semibold bg-white rounded-lg absolute flex items-center justify-center right-1 top-12 gap-[5px] p-[5px]'>
           <MdCancel  size={20} />Cancel Booking
        </div>}

        {isBooked && host == userData?._id &&  <div onClick={()=>setCanceleBooking(prev => !prev)} className='text-red-500 font-semibold bg-white rounded-lg absolute flex items-center justify-center right-1 top-12 gap-[5px] p-[5px]'>
           <MdCancel  size={20} />Cancel by owner
        </div>}

            {canceleBooking &&<div className='w-[300px] h-[100px] bg-[#ffffffdf] absolute top-[110px] left-[13px] rounded-lg'>
            <div  className='w-[100%] h-[50%] text-red-800 flex items-start justify-center rounded-lg overflow-auto text-[20px] p-[10px] font-semibold'>
                 Cancle Booking !
            </div>
         <div className='w-[100%] h-[50%] text-[18px] font-semibold flex  items-start justify-center gap-[10px] text-[#986b6b] font-semibold'>
                Are your sure?
                <button onClick={()=>{cancelBooking(id);setCanceleBooking(false)}} className='px-[20px] bg-red-500 text-white rounded-lg hover:bg-slate-600 cursor-pointer'>Yes</button>
                <button  onClick={()=>setCanceleBooking(prev => !prev)}  className='px-[20px] bg-red-500 text-white rounded-lg hover:bg-slate-600 cursor-pointer'>No</button>
            </div>
        </div> }

        <div className='w-[100%] h-[67%]  rounded-lg overflow-auto flex'>
            <img src={image1} alt="image1" className='w-[100%] flex-shrink-0' />
            <img src={image2} alt="image1" className='w-[100%] flex-shrink-0' />
            <img src={image3} alt="image1" className='w-[100%] flex-shrink-0' />           
        </div>

        <div className='w-[100%] h-[33%] py-[20px] flex flex-col gap-[2px]'>
            <div className='flex justify-between items-center text-[18px]'>
                <span className='w-[80%] text-ellipsis overflow-hidden font-semibold text-nowrap text-[#4a3434] uppercase'>
                In {landMark} , {city}</span>
                <span className='flex items-center justify-center'><FaStar className='text-yellow-400' />{ratings}</span>
            </div>
            <span className='text-[15px] w-[80%] text-ellipsis overflow-hidden text-nowrap font-semibold uppercase'>{title}</span>
            <span className='text-[16px] font-semibold text-[#986b6b]'>₹{rent}/day</span>
        </div>
        
    </div>
  )
}

export default Card