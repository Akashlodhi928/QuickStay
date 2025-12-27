import React from 'react'
import { useState } from 'react';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios"
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { authDataContext } from '../context/AuthContext';
import { userDataCotext } from '../context/UserContext';


function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    let {serverUrl} = useContext(authDataContext)
     let { userData, setUserData} = useContext(userDataCotext)
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let {loading, setLoading} = useContext(authDataContext)

    const handleSignup = async (e)=>{
        setLoading(true)
            e.preventDefault()
        try {
           
            let result = await axios.post(serverUrl +"/api/auth/signup",{
                name,
                email,
                password
            },{withCredentials:true})
            setUserData(result.data)
            navigate("/")
            console.log(result.data)
            setLoading(false)
            toast.success("Signup Successfully")
        } catch (error) {
            setLoading(false)
            console.log("error in signup"+error)
            toast.error(error?.response?.data?.message)
        }
    }
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center relative'>
        <div className='bg-red-200 absolute top-[20px] left-[30px] p-2 rounded-full items-center justify-center' onClick={()=>navigate("/")}>
            <FaArrowLeftLong className='text-3xl' />
        </div>

        <form onSubmit={handleSignup} className='max-w-[900px] w-[90%] h-[600px] flex items-center  justify-center flex-col  md:items-start gap-[10px]'>
            <h1 className='text-[30px] text-black'>Welcome to AirBnb</h1>

            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                <label htmlFor="name" className='text-[20px]'>UserName</label>
                <input className='w-[90%] h-[40px] border-[2px] border-gray-400 rounded-md px-3 text-[18px]'
                 type="text" placeholder='Enter Your Name' id='name' onChange={(e)=>setName(e.target.value)} value={name} required  />  
            </div>

             <div  className='w-[90%] flex items-start justify-start flex-col gap-[10px] '>
                <label htmlFor="email" className='text-[20px]'>Email</label>
                <input  className='w-[90%] h-[40px] border-[2px] border-gray-400 rounded-md px-3 text-[18px]'
                 type="email" placeholder='Enter Your Email' id='email' onChange={(e)=>setEmail(e.target.value)} value={email} required />  
            </div>

             <div  className='w-[90%] flex items-start justify-start flex-col gap-[10px] relative'>
                <label htmlFor="password " className='text-[20px]'>Password</label>
                <input  className='w-[90%] h-[40px] border-[2px] border-gray-400 rounded-md px-3 text-[18px] '
                 type={showPassword?"text":"password"} placeholder='Enter Your Password' id='password' 
                    onChange={(e)=>setPassword(e.target.value)} value={password} required
                 />

                {!showPassword && <IoEye className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px]'  onClick={()=>setShowPassword(prev => !prev)} />}
                { showPassword && <IoEyeOff className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px]' onClick={()=>setShowPassword(prev => !prev)} />}
            </div>
         
            <button disabled={loading} className='px-[50px] py-[8px] bg-red-500 text-white rounded-md font-bold md:px-[100px] mt-[8px]'>{loading?"Loading...":"SignUp"}</button>

            <p className='w-[90%] text-center font-semibold text-gray-700'>Already have a account? 
            <span onClick={()=>navigate("/login")} className='text-red-500 hover:underline cursor-pointer'>Login</span> </p>
          
            
        </form>
        
    </div>
  )
}

export default SignUp