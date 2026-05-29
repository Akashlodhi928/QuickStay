import React, { useContext } from 'react'
import Nav from '../components/Nav'
import Card from '../components/Card'
import Footer from '../components/Footer'
import EmptyState from '../components/EmptyState'
import { listingDataContext } from '../context/ListingContext'
import { HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineMapPin } from 'react-icons/hi2'

const heroImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85'

function Home() {
  const { newlistingData } = useContext(listingDataContext)

  return (
    <div className="page-shell">
      <Nav />
      <main className="pt-[176px] md:pt-[154px]">
        <section className="mx-auto w-full max-w-7xl px-4 pt-6 md:px-8">
          <div className="relative min-h-[520px] overflow-hidden rounded-[2.2rem] bg-stone-950 shadow-[0_32px_110px_rgba(22,32,28,0.22)]">
            <img src={heroImage} alt="Luxury rental home" className="absolute inset-0 h-full w-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/48 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-stone-950/75 to-transparent" />

            <div className="relative flex min-h-[520px] max-w-3xl flex-col justify-center px-6 py-14 text-white md:px-12">
              <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
                <HiOutlineSparkles className="text-orange-300" />
                Premium stays, simple booking
              </div>
              <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
                Find a home that makes the trip feel effortless.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-stone-100 md:text-lg">
                Discover villas, private rooms, flats, farm houses, and city stays with a cleaner booking experience.
              </p>

              <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                {[
                  ['Verified', 'Trusted hosts', HiOutlineShieldCheck],
                  ['Flexible', 'Daily rentals', HiOutlineSparkles],
                  ['Local', 'Prime areas', HiOutlineMapPin],
                ].map(([title, desc, icon]) => (
                  <div key={title} className="rounded-3xl border border-white/15 bg-white/12 p-4 backdrop-blur">
                    {React.createElement(icon, { className: "mb-3 text-2xl text-orange-300" })}
                    <div className="text-xl font-black">{title}</div>
                    <div className="text-sm text-stone-200">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">Handpicked homes</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-stone-950 md:text-4xl">Explore stays near you</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-stone-500">
              Browse available properties with cleaner cards, faster scanning, and responsive layouts for every screen.
            </p>
          </div>

          {newlistingData?.length > 0 ? (
            <div className="grid grid-cols-1 justify-items-center gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {newlistingData.map((list, index) => (
                <Card
                  key={index}
                  title={list.title}
                  landMark={list.landMark}
                  city={list.city}
                  image1={list.image1}
                  image2={list.image2}
                  image3={list.image3}
                  rent={list.rent}
                  id={list._id}
                  ratings={list.ratings}
                  isBooked={list.isBooked}
                  host={list.host}
                  guest={list.guest}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home
