import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { motion } from "framer-motion";
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';


const SignUpPage = () => {

  const [formData, setFormData] = useState({
    fullName :"",
    email : "",
    password : "",
  })

  const {signup, isSigningUp} = useAuthStore();

  const validateForm=() =>{
    if(!formData.fullName.trim() ) return toast.error("Full name is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!/^\S+@\S+\.\S+$/.test(formData.email)) return toast.error("Invalid email format");
    if(!formData.password.trim()) return toast.error("Password is required");
    if(formData.password.length < 6) return toast.error("Password must be at least 6 characters long");

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const success=validateForm();

    if(success) {
      signup(formData)
       console.log("User Signed Up:", formData);
    }
  };



  return (
    <div className='w-full h-[90vh] flex items-center justify-center'>
      <div className='w-1/2 h-full bg-gray-800 flex items-center justify-center'>
      <div className='w-1/2 h-1/2 border border-emerald-500 rounded-xl p-6'>
      <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="fullName"
              className="mt-1 w-full bg-emerald-500 rounded-2xl  p-2  focus:outline-none focus:ring"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 w-full rounded-2xl bg-emerald-500 border border-gray-300 p-2 focus:border-emerald-500 focus:outline-none focus:ring"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 w-full rounded-2xl bg-emerald-500 border border-gray-300 p-2 focus:border-emerald-500 focus:outline-none focus:ring"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full rounded-2xl bg-emerald-500 px-4 py-2 text-gray-800 font-bold hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
           {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
          </button>
        </form></div>
      </div>

      <div className='w-1/2 h-full bg-emerald-500'>
      <div className='h-full w-full bg-emerald-500 flex flex-col items-center justify-center gap-6'>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className='text-gray-800 text-5xl font-bold'
      >
        Hello, friend!
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className='text-gray-800 text-2xl'
      >
        Enter your personal details and start your first conversation.
      </motion.div>
    </div></div>
      
    </div>
  )
}

export default SignUpPage
