import React, { useContext } from 'react'
import Nav from '../components/Nav'
import Card from '../components/Card'
import { listingDataContext } from '../context/ListingContext'

function Home() {
  let {getListing, setListingData,newlistingData} = useContext(listingDataContext)
  return (
    <div>
      <Nav />
      <div className='w-[100vw] h-[77vh] flex items-center justify-center gap-[25px] flex-wrap mt-[250px] md:mt-[155px]'>
        {newlistingData?.map((list, index)=>(
          <Card key={index} title={list.title} landMark={list.landMark} city={list.city} image1={list.image1}
                image2={list.image2} image3={list.image3} rent={list.rent} id={list._id} ratings={list.ratings} isBooked={list.isBooked}
                host={list.host} guest={list.guest} />
          
        ))}
        
      </div>
    </div>
  )
}

export default Home