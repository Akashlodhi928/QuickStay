import React, { useContext } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { userDataCotext } from '../context/UserContext'
import Card from '../components/Card'
import EmptyState from '../components/EmptyState'

function MyListing() {
  const navigate = useNavigate()
  const { userData } = useContext(userDataCotext)

  return (
    <div className="page-shell px-4 py-8">
      <button className="fixed left-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white shadow-lg" onClick={() => navigate('/')}>
        <FaArrowLeftLong className="text-xl text-stone-800" />
      </button>

      <main className="mx-auto w-full max-w-7xl pt-16">
        <div className="mb-8 text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-600">Host dashboard</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-stone-950 md:text-5xl">My Listings</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-stone-500">Manage homes you have added to QuickStay.</p>
        </div>

        {userData?.listing?.length > 0 ? (
          <div className="grid grid-cols-1 justify-items-center gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {userData.listing.map((list, index) => (
              <Card key={index} title={list.title} landMark={list.landMark} city={list.city} image1={list.image1}
                image2={list.image2} image3={list.image3} ratings={list.ratings} rent={list.rent} id={list._id} isBooked={list.isBooked} host={list.host} />
            ))}
          </div>
        ) : (
          <EmptyState title="No listings yet" description="Create your first home listing and it will appear here." />
        )}
      </main>
    </div>
  )
}

export default MyListing
