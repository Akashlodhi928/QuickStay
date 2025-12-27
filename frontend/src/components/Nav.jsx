import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { PiFarmFill } from "react-icons/pi";
import { MdPool } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { FaHouseFlag } from "react-icons/fa6";
import { GiHomeGarage } from "react-icons/gi";
import { BiSolidCabinet } from "react-icons/bi";
import { GiShop } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { authDataContext } from '../context/AuthContext';
import { userDataCotext } from '../context/UserContext';
import { listingDataContext } from '../context/ListingContext';

function Nav() {
    const [popUp, setPopUp] = useState(false)
    const navigate = useNavigate()
    const {serverUrl} = useContext(authDataContext)
     let { userData, setUserData} = useContext(userDataCotext)
     let {listingData, setListingData, newlistingData, setNewListingData,
      handleSearch,searchData, setSearchData, handleViewCrad} = useContext(listingDataContext)
     let [cate , setCate] = useState()
     let [input, setInput] = useState("")

    const handleClick = (id)=>{
        if(userData){
            handleViewCrad(id)
        }else{
            navigate("/login")
        }
    }

    const handleLogOut = async () => {
      try {
           let result = await axios.post(serverUrl +"/api/auth/logout",{},{withCredentials:true})
           console.log("user is logOut Successfully")
           setUserData(null)
          toast.success("Logout Success")
      } catch (error) {
         toast.error("somthing went wrong")
        console.log(error)
      }
    }

    const handleCategory = async (category)=>{
      setCate(category)
      if(category=="trending"){
        setNewListingData(listingData)
      }else{

        setNewListingData(listingData.filter((list)=>list.category==category))
      }
    }

    useEffect(()=>{
      handleSearch(input)
    },[input,])

  return (
    <div className='fixed top-0 w-full bg-white z-50'>
        <div className='w-[100vw] flex min-h-[80px] border-b-[1px] items-center justify-between border-gray-700 rounded-b-3xl md:px-[40px]  '>

             <div className='flex items-center  '>
                <img  src="https://www.creativefabrica.com/wp-content/uploads/2018/12/Key-and-house-rental-housing-logo-by-yahyaanasatokillah.jpg" alt="" className='w-[60px] h-[50px] rounded-full  bg-transparent' />
                <div className='font-semibold text-2xl text-red-500 '>QuickStay</div>
             </div>

             <div className='w-[35%] relative md:block hidden '>
                <input type="text" className='w-[100%] px-[30px] py-[10px] border-[2px] border-gray-400 outline-none overflow-auto 
                rounded-[30px] text-[17px]' placeholder='Any Where | Any Location | Any City'  onChange={(e)=>setInput(e.target.value)} value={input} />
                <button  className='absolute top-[3px] right-[4px]  bg-red-500 p-[10px] rounded-full text-center '>
                    <FaSearch className='w-[23px] h-[23px] text-white' /></button>
             </div>
{/* same */}
            
             <div className='flex items-center justify-center gap-[8px] relative px-6 md:px-3'>
                <span onClick={()=>navigate("/listingpage1")} className='md:block hidden text-[17px] font-semibold cursor-pointer rounded-lg px-[8px] py-[5px] hover:bg-red-100'>List your home</span>
                <button  onClick={()=>setPopUp(prev => !prev)} className='px-[10px] py-[5px] flex items-center justify-center gap-[5px] border-[1px] border-[#8d8c8c] rounded-[50px] hover:shadow-lg'>
                 <span><GiHamburgerMenu className='w-[25px] h-[25px]' /></span>

                  {userData == null &&<span><CgProfile  className='w-[30px] h-[30px]'/></span>}
            {userData != null && (
              <span className="w-[30px] h-[30px] bg-gray-900 text-white rounded-full flex items-center justify-center text-center text-xl uppercase">
                {userData?.name?.slice(0, 1)}
              </span>
            )}

                </button>
             </div>
             
          { popUp &&  
            <div className='w-[220px] z-50 h-[270px] absolute bg-white right-[25px] top-[70px] rounded-lg shadow-xl border border-gray-200 transition-all duration-300 animate-slideDown'>
              <ul className='w-full h-full text-[17px] flex flex-col items-start justify-around py-3'>
                {userData == null && 
                  <li onClick={()=>{navigate("/login");setPopUp(false)}} 
                      className='w-full px-5 py-2 hover:bg-red-200 cursor-pointer rounded-md transition-all duration-300'>
                      Login
                  </li>
                }
                {userData != null && 
                  <li onClick={()=>{handleLogOut();setPopUp(false)}} 
                      className='w-full px-5 py-2 hover:bg-red-200 cursor-pointer rounded-md transition-all duration-300'>
                      Logout
                  </li>
                }
                <hr className='w-full h-[2px] underline' />
                <li onClick={()=>navigate("/listingpage1")} className='w-full px-5 py-2 hover:bg-red-200 cursor-pointer rounded-md transition-all duration-300'>
                  List your Home
                </li>
                <li onClick={()=>{navigate("/mylisting");setPopUp(false)}} className='w-full px-5 py-2 hover:bg-red-200 cursor-pointer rounded-md transition-all duration-300'>
                  My Listing
                </li>
                <li onClick={()=>{navigate("/mybooking");setPopUp(false)}} className='w-full px-5 py-2 hover:bg-red-200 cursor-pointer rounded-md transition-all duration-300'>
                  My Booking
                </li>
              </ul>
            </div>
          }

{/* search Data  */}

       {searchData?.length > 0 && (
          <div
            className="w-full bg-white max-h-[60vh] flex flex-col items-center absolute top-[85px] left-0 z-50 px-4 md:px-10">
            <div className="w-full max-w-[700px]bg-white shadow-2xl rounded-2xl overflow-y-auto border border-gray-300 p-4 transition-all duration-300 animate-fadeIn">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                🔍 Search Results
              </h3>

              <div className="flex flex-col divide-y divide-gray-200">
                {searchData.map((search, index) => (
                  <div
                    key={index}
                    onClick={() => handleViewCrad(search._id)}
                    className="p-3 hover:bg-red-50 cursor-pointer transition-all duration-300 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="text-gray-800 font-medium text-base sm:text-[17px]">
                      {search.title}
                    </span>
                    <span className="text-gray-600 text-sm sm:text-[15px] mt-1 sm:mt-0">
                      in {search.landMark}, {search.city}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}




            

        </div>

          <div className='w-[100%] h-[60px] py-[10px] flex items-center justify-center relative block md:hidden '>
                <input type="text" className='w-[100%] px-[30px] py-[10px] border-[2px] border-gray-400 outline-none overflow-auto 
                rounded-[30px] text-[17px]' placeholder='Any Where | Any Location | Any City' onChange={(e)=>setInput(e.target.value)} value={input} />
                <button className=' absolute top-[8px] right-[4px]  bg-red-500 p-[10px] rounded-full text-center '>
                    <FaSearch className='w-[23px] h-[23px] text-white' /></button>
             </div>

        <div className='w-[100vw] h-[85px] bg-white flex items-center justify-start md:justify-center cursor-pointer gap-[50px] 
        overflow-x-auto px-[15px]'>

            <div onClick={()=>{handleCategory("trending");setCate("")}} className='flex flex-col items-center justify-center hover:border-b-[2px] border-gray-600 text-[13px]'>
                <MdWhatshot className='w-[30px] h-[30px] text-black' />
                <h3 className='font-bold'>Trending</h3>
            </div>
              <div className={`flex flex-col items-center justify-center hover:border-b-[2px] border-gray-600 text-[13px]
                 ${cate=="villa"?"border-b-[1px] border-gray-600":""}`} onClick={()=>handleCategory("villa")}>
                <GiFamilyHouse className='w-[30px] h-[30px] text-black' />
                <h3 className='font-bold'>Villa</h3>
            </div>
              <div className={`flex flex-col items-center justify-center hover:border-b-[2px] border-gray-600 text-[13px]
                 ${cate=="farmHouse"?"border-b-[1px] border-gray-600":""}`} onClick={()=>handleCategory("farmHouse")}>
                <PiFarmFill className='w-[30px] h-[30px] text-black' />
                <h3 className='font-bold text-nowrap'>Farm House</h3>
            </div>
              <div className={`flex flex-col items-center justify-center hover:border-b-[2px] border-gray-600 text-[13px]
                 ${cate=="pool"?"border-b-[1px] border-gray-600":""}`} onClick={()=>handleCategory("pool")}>
                <MdPool className='w-[30px] h-[30px] text-black' />
                <h3 className='font-bold'>Pool</h3>
            </div>
              <div className={`flex flex-col items-center justify-center hover:border-b-[2px] border-gray-600 text-[13px]
                 ${cate=="rooms"?"border-b-[1px] border-gray-600":""}`} onClick={()=>handleCategory("rooms")}>
                <MdBedroomParent className='w-[30px] h-[30px] text-black' />
                <h3 className='font-bold'>Rooms</h3>
            </div>
              <div className={`flex flex-col items-center justify-center hover:border-b-[2px] border-gray-600 text-[13px]
                 ${cate=="flat"?"border-b-[1px] border-gray-600":""}`} onClick={()=>handleCategory("flat")}>
                <FaHouseFlag className='w-[30px] h-[30px] text-black' />
                <h3 className='font-bold'>Flat</h3>
            </div>
              <div className={`flex flex-col items-center justify-center hover:border-b-[2px] border-gray-600 text-[13px]
                 ${cate=="pg"?"border-b-[1px] border-gray-600":""}`} onClick={()=>handleCategory("pg")}>
                <GiHomeGarage className='w-[30px] h-[30px] text-black' />
                <h3 className='font-bold'>PG</h3>
            </div>
              <div className={`flex flex-col items-center justify-center hover:border-b-[2px] border-gray-600 text-[13px]
                 ${cate=="cabines"?"border-b-[1px] border-gray-600":""}`} onClick={()=>handleCategory("cabines")}>
                <BiSolidCabinet className='w-[30px] h-[30px] text-black' />
                <h3 className='font-bold'>Cabines</h3>
            </div>
              <div className={`flex flex-col items-center justify-center hover:border-b-[2px] border-gray-600 text-[13px]
                 ${cate=="shop"?"border-b-[1px] border-gray-600":""}`} onClick={()=>handleCategory("shop")}>
                <GiShop className='w-[30px] h-[30px] text-black' />
                <h3 className='font-bold'>Shops</h3>
            </div>
        </div>
        
    </div>
  )
}

export default Nav