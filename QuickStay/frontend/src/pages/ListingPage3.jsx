import React, { useContext } from 'react'
import { FaArrowLeftLong, FaStar } from 'react-icons/fa6'
import { HiOutlineMapPin, HiOutlineSparkles } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { listingDataContext } from '../context/ListingContext'

function ListingPage3() {
  const navigate = useNavigate()
  const {
    title, description,
    frontEndImage1, frontEndImage2, frontEndImage3,
    rent, city, landMark, category, handleAddListing,
    adding
  } = useContext(listingDataContext)

  return (
    <div className="page-shell px-4 py-8">
      <button className="fixed left-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white shadow-lg" onClick={() => navigate("/listingpage2")}>
        <FaArrowLeftLong className="text-xl text-stone-800" />
      </button>

      <main className="mx-auto w-full max-w-6xl pt-16">
        <div className="mb-8 text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-600">Step 3 of 3</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-stone-950 md:text-5xl">Preview your listing</h1>
        </div>

        <section className="soft-card overflow-hidden rounded-[2.2rem]">
          <div className="grid gap-3 p-3 md:grid-cols-[1.4fr_0.8fr]">
            <img src={frontEndImage1} alt={title} className="h-[310px] w-full rounded-[1.6rem] object-cover md:h-[520px]" />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
              <img src={frontEndImage2} alt={title} className="h-[190px] w-full rounded-[1.6rem] object-cover md:h-[253px]" />
              <img src={frontEndImage3} alt={title} className="h-[190px] w-full rounded-[1.6rem] object-cover md:h-[253px]" />
            </div>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-[1fr_340px] md:p-8">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-orange-700">{category}</span>
                <span className="flex items-center gap-1 text-sm font-bold text-stone-500"><HiOutlineMapPin className="text-orange-500" /> {landMark}, {city}</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-stone-950">{title}</h2>
              <p className="mt-4 text-base leading-8 text-stone-600">{description}</p>
            </div>

            <aside className="rounded-[1.8rem] border border-stone-200 bg-stone-50 p-5">
              <div className="mb-4 flex items-center gap-2 text-sm font-black text-stone-600">
                <FaStar className="text-yellow-400" /> New listing preview
              </div>
              <div className="text-sm font-bold uppercase tracking-[0.18em] text-stone-400">Price</div>
              <div className="mt-1 text-4xl font-black text-stone-950">Rs. {rent}<span className="text-base text-stone-500"> / day</span></div>
              <button onClick={handleAddListing} disabled={adding} className="primary-gradient mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-base font-black text-white shadow-lg shadow-red-500/20 hover:-translate-y-0.5">
                <HiOutlineSparkles />
                {adding ? "Adding..." : "Add Listing"}
              </button>
            </aside>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ListingPage3
