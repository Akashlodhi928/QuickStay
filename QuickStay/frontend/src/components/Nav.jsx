import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu, GiFamilyHouse, GiHomeGarage, GiShop } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot, MdPool, MdBedroomParent } from "react-icons/md";
import { PiFarmFill } from "react-icons/pi";
import { FaHouseFlag } from "react-icons/fa6";
import { BiSolidCabinet } from "react-icons/bi";
import { HiOutlineHomeModern, HiOutlineMapPin, HiOutlineSparkles } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { authDataContext } from '../context/AuthContext';
import { userDataCotext } from '../context/UserContext';
import { listingDataContext } from '../context/ListingContext';

const categories = [
  { key: 'trending', label: 'Trending', icon: MdWhatshot },
  { key: 'villa', label: 'Villa', icon: GiFamilyHouse },
  { key: 'farmHouse', label: 'Farm House', icon: PiFarmFill },
  { key: 'pool', label: 'Pool', icon: MdPool },
  { key: 'rooms', label: 'Rooms', icon: MdBedroomParent },
  { key: 'flat', label: 'Flat', icon: FaHouseFlag },
  { key: 'pg', label: 'PG', icon: GiHomeGarage },
  { key: 'cabines', label: 'Cabines', icon: BiSolidCabinet },
  { key: 'shop', label: 'Shops', icon: GiShop },
]

function SearchBox({ mobile = false, input, setInput }) {
  return (
    <div className={`relative ${mobile ? 'w-full' : 'hidden w-[min(42vw,560px)] md:block'}`}>
      <HiOutlineMapPin className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-stone-400" />
      <input
        type="text"
        className="h-12 w-full rounded-full border border-stone-200 bg-white/90 px-12 text-sm font-medium text-stone-800 shadow-sm placeholder:text-stone-400"
        placeholder="Search by city, landmark, or property"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <button className="primary-gradient absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-full text-white shadow-lg shadow-red-500/20">
        <FaSearch className="text-sm" />
      </button>
    </div>
  )
}

function Nav() {
  const [popUp, setPopUp] = useState(false)
  const [cate, setCate] = useState('trending')
  const [input, setInput] = useState("")
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const { userData, setUserData } = useContext(userDataCotext)
  const {
    listingData,
    setNewListingData,
    handleSearch,
    searchData,
    handleViewCrad
  } = useContext(listingDataContext)

  const handleLogOut = async () => {
    try {
      await axios.post(serverUrl + "/api/auth/logout", {}, { withCredentials: true })
      setUserData(null)
      setPopUp(false)
      toast.success("Logout Success")
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }

  const handleCategory = (category) => {
    setCate(category)
    if (category === "trending") {
      setNewListingData(listingData)
      return
    }
    setNewListingData(listingData.filter((list) => list.category === category))
  }

  useEffect(() => {
    handleSearch(input)
  }, [input])

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-stone-200/80 bg-white/85 shadow-sm backdrop-blur-2xl">
      <div className="mx-auto flex min-h-[74px] w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 text-left">
          <div className="primary-gradient flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg shadow-red-500/20">
            <HiOutlineHomeModern className="text-2xl" />
          </div>
          <div>
            <div className="text-xl font-black tracking-tight text-stone-950">QuickStay</div>
            <div className="hidden text-xs font-semibold uppercase tracking-[0.22em] text-stone-400 sm:block">Premium rentals</div>
          </div>
        </button>

        <SearchBox input={input} setInput={setInput} />

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate("/listingpage1")}
            className="hidden rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font800 font-bold text-stone-800 shadow-sm hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg md:flex"
          >
            List your home
          </button>
          <button
            onClick={() => setPopUp((prev) => !prev)}
            className="flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-2.5 py-2 shadow-sm hover:shadow-lg"
          >
            <GiHamburgerMenu className="h-6 w-6 text-stone-700" />
            {userData == null && <CgProfile className="h-8 w-8 text-stone-700" />}
            {userData != null && (
              <span className="primary-gradient flex h-8 w-8 items-center justify-center rounded-full text-sm font-black uppercase text-white">
                {userData?.name?.slice(0, 1)}
              </span>
            )}
          </button>
        </div>

        {popUp && (
         <div className="animate-slide-down fixed right-4 top-[78px] z-[999] w-[260px] overflow-hidden rounded-3xl border border-stone-200 bg-white p-2 shadow-2xl md:absolute md:right-8 md:top-[66px]">
            <ul className="flex flex-col text-sm font-semibold text-stone-700">
              {userData == null && (
                <li onClick={() => { navigate("/login"); setPopUp(false) }} className="cursor-pointer rounded-2xl px-4 py-3 hover:bg-orange-50 hover:text-orange-600">
                  Login
                </li>
              )}
              {userData != null && (
                <li onClick={handleLogOut} className="cursor-pointer rounded-2xl px-4 py-3 hover:bg-orange-50 hover:text-orange-600">
                  Logout
                </li>
              )}
              <li onClick={() => { navigate("/listingpage1"); setPopUp(false) }} className="cursor-pointer rounded-2xl px-4 py-3 hover:bg-orange-50 hover:text-orange-600">
                List your Home
              </li>
              <li onClick={() => { navigate("/mylisting"); setPopUp(false) }} className="cursor-pointer rounded-2xl px-4 py-3 hover:bg-orange-50 hover:text-orange-600">
                My Listing
              </li>
              <li onClick={() => { navigate("/mybooking"); setPopUp(false) }} className="cursor-pointer rounded-2xl px-4 py-3 hover:bg-orange-50 hover:text-orange-600">
                My Booking
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-stone-100 px-4 py-3 md:hidden">
        <SearchBox mobile input={input} setInput={setInput} />
      </div>

      {searchData?.length > 0 && input.trim() && (
        <div className="animate-fade absolute left-0 top-full z-50 w-full px-4 pt-3 md:px-8">
          <div className="mx-auto max-h-[58vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-stone-200 bg-white p-3 shadow-2xl">
            <div className="mb-2 flex items-center gap-2 px-2 py-2 text-sm font-black text-stone-700">
              <HiOutlineSparkles className="text-orange-500" />
              Search results
            </div>
            <div className="flex flex-col divide-y divide-stone-100">
              {searchData.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleViewCrad(search._id)}
                  className="flex w-full flex-col rounded-2xl px-4 py-3 text-left hover:bg-orange-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-bold text-stone-900">{search.title}</span>
                  <span className="text-sm text-stone-500">in {search.landMark}, {search.city}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav className="hide-scrollbar flex w-full items-center justify-start gap-3 overflow-x-auto border-t border-stone-100 bg-white/70 px-4 py-3 md:justify-center">
        {categories.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => handleCategory(key)}
            className={`flex min-w-[86px] flex-col items-center justify-center gap-1 rounded-2xl border px-3 py-2 text-xs font-black ${
              cate === key
                ? 'border-orange-200 bg-orange-50 text-orange-600 shadow-sm'
                : 'border-transparent text-stone-500 hover:border-stone-200 hover:bg-white hover:text-stone-900'
            }`}
          >
            {React.createElement(icon, { className: "h-5 w-5" })}
            <span className="whitespace-nowrap">{label}</span>
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Nav
