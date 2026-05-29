import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { HiOutlineHomeModern } from 'react-icons/hi2'

function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-stone-950 text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="max-w-md">
          <div className="mb-3 flex items-center gap-3">
            <div className="primary-gradient flex h-10 w-10 items-center justify-center rounded-2xl shadow-lg shadow-red-950/30">
              <HiOutlineHomeModern className="text-xl" />
            </div>
            <span className="text-xl font-black tracking-tight">QuickStay</span>
          </div>
          <p className="text-sm leading-6 text-stone-300">
            Curated rentals, verified stays, and simple hosting tools for homes that feel worth arriving at.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm text-stone-300 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-white">Explore</span>
            <span>Trending homes</span>
            <span>City stays</span>
            <span>Weekend villas</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-white">Host</span>
            <span>List your home</span>
            <span>Manage bookings</span>
            <span>Guest ratings</span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-white">Social</span>
            <div className="flex gap-2">
              {[FaInstagram, FaFacebookF, FaLinkedinIn].map((Icon, index) => (
                <span key={index} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5">
                  <Icon />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
