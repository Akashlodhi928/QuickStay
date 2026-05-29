import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'
import Card from '../components/Card'
import EmptyState from '../components/EmptyState'
import { userDataCotext } from '../context/UserContext'

function MyBookings() {
  const navigate = useNavigate()
  const { userData } = useContext(userDataCotext)

  return (
    <div className="page-shell px-4 py-8">
      <button className="fixed left-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white shadow-lg" onClick={() => navigate('/')}>
        <FaArrowLeftLong className="text-xl text-stone-800" />
      </button>

      <main className="mx-auto w-full max-w-7xl pt-16">
        <div className="mb-8 text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-600">Guest dashboard</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-stone-950 md:text-5xl">My Bookings</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-stone-500">Upcoming and current homes you have booked.</p>
        </div>

        {userData?.booking?.length > 0 ? (
          <div className="grid grid-cols-1 justify-items-center gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {userData.booking.map((list, index) => (
              <Card key={index} title={list.title} landMark={list.landMark} city={list.city} image1={list.image1}
                image2={list.image2} image3={list.image3} ratings={list.ratings} rent={list.rent} id={list._id} isBooked={list.isBooked} host={list.host} guest={list.guest} />
            ))}
          </div>
        ) : (
          <EmptyState title="No bookings yet" description="When you book a home, your trip details will show up here." />
        )}
      </main>
    </div>
  )
}

export default MyBookings
