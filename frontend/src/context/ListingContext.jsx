import axios from 'axios'
import React, { useContext, createContext, useState, useEffect } from 'react'
import { data, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authDataContext } from './AuthContext'

export const listingDataContext = createContext()

function ListingContext({ children }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [frontEndImage1, setFrontEndImage1] = useState(null)
  const [frontEndImage2, setFrontEndImage2] = useState(null)
  const [frontEndImage3, setFrontEndImage3] = useState(null)
  const [backEndImage1, setBackEndImage1] = useState(null)
  const [backEndImage2, setBackEndImage2] = useState(null)
  const [backEndImage3, setBackEndImage3] = useState(null)
  const [rent, setRent] = useState("")
  const [city, setCity] = useState("")
  const [landMark, setLandMark] = useState("")
  const [category, setCategory] = useState("")
  const { serverUrl } = useContext(authDataContext)
  const [adding, setAdding] = useState(false)
   const [updating, setUpdating] = useState(false)
   const [deleteing, setDeleteing] = useState(false)
  const [listingData, setListingData] = useState([])
  const [newlistingData, setNewListingData] = useState([])
  const [cardDetails, setCardDetails] = useState(null)
  let [searchData, setSearchData] = useState([])
  let navigate = useNavigate()

  // ✅ Handle file input safely
  const handleFileChange = (e, setBackEndImage, setFrontEndImage) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setBackEndImage(file)
      setFrontEndImage(URL.createObjectURL(file)) // preview
    }
  }

  // ✅ Add listing
  const handleAddListing = async () => {
    setAdding(true)
    try {
      const formData = new FormData()

      // Text fields
      formData.append("title", title)
      formData.append("description", description)
      formData.append("rent", rent)
      formData.append("city", city)
      formData.append("landMark", landMark)
      formData.append("category", category)

      // Image fields — only append if valid File object
      if (backEndImage1 instanceof File) formData.append("image1", backEndImage1)
      if (backEndImage2 instanceof File) formData.append("image2", backEndImage2)
      if (backEndImage3 instanceof File) formData.append("image3", backEndImage3)

      // POST request
      const result = await axios.post(serverUrl + "/api/listing/add", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })

      console.log("✅ Listing added successfully:", result.data)
      setTitle("")
      setDescription("")
      setFrontEndImage1("")
      setFrontEndImage2("")
      setFrontEndImage3("")
      setBackEndImage1("")
      setBackEndImage2("")
      setBackEndImage3("")
      setRent("")
      setCity("")
      setLandMark("")
      setCategory("")
      navigate("/")
      setAdding(false)
      toast.success("Add Listing successfully")
    } catch (error) {
      setAdding(false)
      toast.error(error?.response?.data?.message || error.message)
      console.error("❌ Error adding listing:", error)
    }
  }

  const getListing = async () => {
    try {
        let result = await axios.get(serverUrl + "/api/listing/get",{withCredentials:true})
        setListingData(result.data)
        // console.log(result.data)
        setNewListingData(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getListing()
  },[adding, updating, deleteing])



   const handleViewCrad  = async (id) => {
    try {
        let result = await axios.get(serverUrl + `/api/listing/findlistingbyid/${id}`,{withCredentials:true})
        setCardDetails(result.data)
        navigate("/viewcard")
        console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = async (data) => {
    try {
      let result = await axios.get(`${serverUrl}/api/listing/search?query=${data}`)
      setSearchData(result.data)
    } catch (error) {
      console.log(error)
      setSearchData(null)
    }
  }

  const value = {
    title, setTitle,
    description, setDescription,
    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,
    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,
    rent, setRent,
    city, setCity,
    landMark, setLandMark,
    category, setCategory,
    handleAddListing,
    handleFileChange,
    adding, setAdding,getListing,listingData, setListingData,
    newlistingData, setNewListingData, handleViewCrad,
    cardDetails, setCardDetails ,updating, setUpdating,
    deleteing, setDeleteing,handleSearch,searchData, setSearchData
     // ✅ export function to handle file inputs
  }

  return (
    <listingDataContext.Provider value={value}>
      {children}
    </listingDataContext.Provider>
  )
}

export default ListingContext
