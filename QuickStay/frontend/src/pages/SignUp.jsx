import React, { useContext, useState } from 'react'
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiOutlineHomeModern, HiOutlineSparkles } from 'react-icons/hi2';
import axios from "axios"
import { toast } from 'react-toastify';
import { authDataContext } from '../context/AuthContext';
import { userDataCotext } from '../context/UserContext';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { serverUrl, loading, setLoading } = useContext(authDataContext)
  const { setUserData } = useContext(userDataCotext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const result = await axios.post(serverUrl + "/api/auth/signup", { name, email, password }, { withCredentials: true })
      setUserData(result.data)
      navigate("/")
      setLoading(false)
      toast.success("Signup Successfully")
    } catch (error) {
      setLoading(false)
      console.log("error in signup" + error)
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className="page-shell flex items-center justify-center px-4 py-8">
      <button className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white shadow-lg" onClick={() => navigate("/")}>
        <FaArrowLeftLong className="text-xl text-stone-800" />
      </button>

      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2.2rem] bg-white shadow-[0_30px_100px_rgba(22,32,28,0.16)] lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={handleSignup} className="flex min-h-[680px] flex-col justify-center px-6 py-12 sm:px-10 lg:px-14">
          <div className="mb-8 flex items-center gap-3">
            <div className="primary-gradient flex h-12 w-12 items-center justify-center rounded-2xl text-white">
              <HiOutlineHomeModern className="text-2xl" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight text-stone-950">Create account</h2>
              <p className="text-sm font-medium text-stone-500">Join QuickStay in a minute</p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <label className="flex flex-col gap-2 text-sm font-bold text-stone-700" htmlFor="name">
              User Name
              <input className="h-12 rounded-2xl border border-stone-200 bg-stone-50 px-4 text-base text-stone-900" type="text" placeholder="Enter your name" id="name" onChange={(e) => setName(e.target.value)} value={name} required />
            </label>

            <label className="flex flex-col gap-2 text-sm font-bold text-stone-700" htmlFor="email">
              Email
              <input className="h-12 rounded-2xl border border-stone-200 bg-stone-50 px-4 text-base text-stone-900" type="email" placeholder="Enter your email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
            </label>

            <label className="relative flex flex-col gap-2 text-sm font-bold text-stone-700" htmlFor="password">
              Password
              <input className="h-12 rounded-2xl border border-stone-200 bg-stone-50 px-4 pr-12 text-base text-stone-900" type={showPassword ? "text" : "password"} placeholder="Enter your password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
              <button type="button" className="absolute bottom-3 right-4 text-xl text-stone-500" onClick={() => setShowPassword((prev) => !prev)}>
                {!showPassword ? <IoEye /> : <IoEyeOff />}
              </button>
            </label>
          </div>

          <button disabled={loading} className="primary-gradient mt-7 h-12 rounded-2xl text-base font-black text-white shadow-lg shadow-red-500/20 hover:-translate-y-0.5">
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <p className="mt-6 text-center text-sm font-semibold text-stone-500">
            Already have an account?
            <span onClick={() => navigate("/login")} className="ml-1 cursor-pointer font-black text-orange-600 hover:underline">Login</span>
          </p>
        </form>

        <div className="relative hidden min-h-[680px] overflow-hidden bg-stone-950 lg:block">
          <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85" alt="Premium rental villa" className="absolute inset-0 h-full w-full object-cover opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/35 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 text-white">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-white/15 backdrop-blur">
              <HiOutlineSparkles className="text-3xl text-orange-300" />
            </div>
            <h1 className="text-5xl font-black leading-tight tracking-tight">Start exploring homes with personality.</h1>
            <p className="mt-4 max-w-md text-base leading-7 text-stone-200">Book better stays and list your own space with a clean, secure rental experience.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
