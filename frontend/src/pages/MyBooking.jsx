import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'
import Card from '../components/Card'
import { userDataCotext } from '../context/UserContext'

function MyBookings() {
   const navigate = useNavigate()
    let {userData} = useContext(userDataCotext)
  return (
    <div className='w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative'>
        <div className="bg-red-200 absolute top-[20px] left-[30px] p-2 rounded-full items-center justify-center cursor-pointer"
         onClick={() => navigate('/')} >
                <FaArrowLeftLong className="text-3xl" />
        </div>

        <div className='w-[50%] h-[10%] border-[2px] border-gray-400 p-[15px] flex items-center justify-center text-[30px] rounded-md 
                          font-semibold mt-[20px] md:w-[600px] text-nowrap'>
            My Booking </div>

       <div className='w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]'>
            {userData?.booking?.map((list, index)=>(
                <Card key={index} title={list.title} landMark={list.landMark} city={list.city} image1={list.image1}
                image2={list.image2} image3={list.image3} ratings={list.ratings} rent={list.rent} id={list._id} isBooked={list.isBooked} host={list.host}  guest={list.guest} />
             ))}
        </div>
        
    </div>
  )
}

export default MyBookings