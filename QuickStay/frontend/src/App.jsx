import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { userDataCotext } from './context/UserContext.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ListingPage1 from './pages/ListingPage1';
import ListingPage2 from './pages/ListingPage2';
import ListingPage3 from './pages/ListingPage3';
import MyListing from './pages/MyListing';
import ViewCrad from './pages/ViewCard';
import MyBookings from './pages/MyBooking';
import Booked from './pages/Booked';

function App() {
 let { userData, authLoading } = useContext(userDataCotext)

if (authLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center font-bold">
      Loading...
    </div>
  )
}
  return (
    <>

     <ToastContainer />
  
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/listingpage1' element={userData != null? <ListingPage1/>:<Navigate to={"/login"}/>} />
        <Route path='/listingpage2'  element={userData != null? <ListingPage2/>:<Navigate to={"/"}/>} />
        <Route path='/listingpage3'  element={userData != null? <ListingPage3/>:<Navigate to={"/"}/>}/>
        <Route path='/mylisting'  element={userData != null? <MyListing/>:<Navigate to={"/login"}/>}/>
        <Route path='/viewcard/:id' element={userData != null ? <ViewCrad /> : <Navigate to={"/"} />} />
        <Route path='/mybooking'  element={userData != null? <MyBookings/>:<Navigate to={"/login"}/>}/>
         <Route path='/booked'  element={userData != null? <Booked/>:<Navigate to={"/"}/>}/>
      </Routes>
      
    </>
  )
}

export default App
