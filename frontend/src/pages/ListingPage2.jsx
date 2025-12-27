import React, { useContext } from 'react'
import { BiSolidCabinet } from 'react-icons/bi'
import { FaArrowLeftLong, FaHouseFlag } from 'react-icons/fa6'
import { GiFamilyHouse, GiHomeGarage, GiShop } from 'react-icons/gi'
import { MdBedroomParent, MdPool } from 'react-icons/md'
import { PiFarmFill } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import { listingDataContext } from '../context/ListingContext'

function ListingPage2() {

  const navigate = useNavigate() 
  let {category, setCategory} = useContext(listingDataContext)

  return (
     <div className='w-[100%] h-[100vh] bg-white flex items-center justify-center relative overflow-auto'>
    
        <div className='bg-red-200 absolute top-[20px] left-[30px] p-2 rounded-full items-center justify-center' onClick={()=>navigate("/listingpage1")}>
                        <FaArrowLeftLong className='text-3xl' />
         </div>

         <div className='w-[240px] h-[40px] bg-red-500 font-bold text-white flex items-center justify-center rounded-[30px] absolute top-[20px] right-[30px] shadow-lg'>
             SetUp Home Category
         </div>

      <div className='max-w-[900px] w-[100%] h-[550px] overflow-auto bg-white flex items-center justify-start flex-col gap-[40px]'>
              <h1 className='text-[18px] text-black md:text-[30px] '>
                Which of these best describes your place
              </h1>

              <div  className='max-w-[900px] w-[90%] h-[100%] flex items-center  justify-center flex-wrap  md:items-start gap-[50px] md:[70%]'>

                  <div onClick={()=>setCategory("villa")} className={`w-[180px] h-[100px] flex justify-center items-center
                   flex flex-col cursor-pointer border-[2px]  text-[13px] rounded-lg ${category == "villa"?"border-red-500":""}`}>
                    <GiFamilyHouse className='w-[40px] h-[40px] text-black' /><h3 className='font-bold text-xl'>Villa</h3>
                  </div>

                  <div  onClick={()=>setCategory("farmHouse")}  className={`w-[180px] h-[100px] flex justify-center items-center
                   flex flex-col cursor-pointer border-[2px]  text-[13px] rounded-lg ${category == "farmHouse"?"border-red-500":""}`}>
                    <PiFarmFill className='w-[40px] h-[40px] text-black' /><h3 className='font-bold text-xl'>Farm House</h3>
                  </div>

                  <div  onClick={()=>setCategory("pool")}  className={`w-[180px] h-[100px] flex justify-center items-center flex
                   flex-col cursor-pointer border-[2px]   text-[13px] rounded-lg ${category == "pool"?"border-red-500":""}`}>
                    <MdPool className='w-[40px] h-[40px] text-black' /><h3 className='font-bold text-xl'>Pool</h3>
                  </div>

                  <div  onClick={()=>setCategory("rooms")}  className={`w-[180px] h-[100px] flex justify-center items-center flex
                   flex-col cursor-pointer border-[2px]   text-[13px] rounded-lg ${category == "rooms"?"border-red-500":""}`}>
                    <MdBedroomParent className='w-[40px] h-[40px] text-black' /><h3 className='font-bold text-xl'>Rooms</h3>
                  </div>

                  <div  onClick={()=>setCategory("flat")}  className={`w-[180px] h-[100px] flex justify-center items-center flex 
                  flex-col cursor-pointer border-[2px]   text-[13px] rounded-lg ${category == "flat"?"border-red-500":""}`}>
                    <FaHouseFlag className='w-[40px] h-[40px] text-black' /><h3 className='font-bold text-xl'>Flat</h3>
                  </div>

                  <div  onClick={()=>setCategory("pg")}  className={`w-[180px] h-[100px] flex justify-center items-center flex flex-col 
                  cursor-pointer border-[2px]  text-[13px] rounded-lg ${category == "pg"?"border-red-500":""}`}>
                    <GiHomeGarage className='w-[40px] h-[40px] text-black' /><h3 className='font-bold text-xl'>PG</h3>
                  </div>

                  <div  onClick={()=>setCategory("cabines")}  className={`w-[180px] h-[100px] flex justify-center items-center flex flex-col
                   cursor-pointer border-[2px]   text-[13px] rounded-lg ${category == "cabines"?"border-red-500":""}`}>
                    <BiSolidCabinet className='w-[40px] h-[40px] text-black' /><h3 className='font-bold text-xl'>Cabines</h3>
                  </div>

                  <div  onClick={()=>setCategory("shop")}  className={`w-[180px] h-[100px] flex justify-center items-center flex flex-col 
                  cursor-pointer border-[2px]   text-[13px] rounded-lg ${category == "shop"?"border-red-500":""}`}>
                    <GiShop className='w-[40px] h-[40px] text-black' /><h3 className='font-bold text-xl'>Shop</h3>
                  </div>

                  
              </div>
             
              
      </div>
          <button onClick={()=>navigate("/listingpage3")}  disabled={!category} className='px-[60px] py-[10px] md:right-[180px] absolute bottom-[50px]
            bottom-[20px] right-[10px] bg-red-500 text-white rounded-md font-bold md:px-[100px] mt-[8px]'>
                    Next</button>
            
      </div>
  )
}

export default ListingPage2