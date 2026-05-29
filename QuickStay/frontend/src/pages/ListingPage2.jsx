import React, { useContext } from 'react'
import { BiSolidCabinet } from 'react-icons/bi'
import { FaArrowLeftLong, FaHouseFlag } from 'react-icons/fa6'
import { GiFamilyHouse, GiHomeGarage, GiShop } from 'react-icons/gi'
import { MdBedroomParent, MdPool } from 'react-icons/md'
import { PiFarmFill } from 'react-icons/pi'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { listingDataContext } from '../context/ListingContext'

const categories = [
  ['villa', 'Villa', GiFamilyHouse],
  ['farmHouse', 'Farm House', PiFarmFill],
  ['pool', 'Pool', MdPool],
  ['rooms', 'Rooms', MdBedroomParent],
  ['flat', 'Flat', FaHouseFlag],
  ['pg', 'PG', GiHomeGarage],
  ['cabines', 'Cabines', BiSolidCabinet],
  ['shop', 'Shop', GiShop],
]

function ListingPage2() {
  const navigate = useNavigate()
  const { category, setCategory } = useContext(listingDataContext)

  return (
    <div className="page-shell px-4 py-8">
      <button className="fixed left-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white shadow-lg" onClick={() => navigate("/listingpage1")}>
        <FaArrowLeftLong className="text-xl text-stone-800" />
      </button>

      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center pt-14">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-orange-100 text-orange-600">
            <HiOutlineSparkles className="text-3xl" />
          </div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-600">Step 2 of 3</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-stone-950 md:text-5xl">Which category fits your place?</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-stone-500">Choose the category guests will use to discover your listing.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(([key, label, icon]) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`soft-card flex min-h-[150px] flex-col items-center justify-center gap-4 rounded-[2rem] p-5 text-center hover:-translate-y-1 ${
                category === key ? 'border-orange-300 bg-orange-50 text-orange-600 ring-4 ring-orange-100' : 'text-stone-800'
              }`}
            >
              {React.createElement(icon, { className: "h-11 w-11" })}
              <span className="text-xl font-black">{label}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button onClick={() => navigate("/listingpage3")} disabled={!category} className="primary-gradient h-12 rounded-2xl px-12 text-base font-black text-white shadow-lg shadow-red-500/20 hover:-translate-y-0.5">
            Continue
          </button>
        </div>
      </main>
    </div>
  )
}

export default ListingPage2
