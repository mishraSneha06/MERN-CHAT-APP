import React from 'react'
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from 'lucide-react';

const LoginPage = () => {



  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
    console.log("Login with:", { email, password });
  };

   const { login, isLoggingIn } = useAuthStore();

  return (
    <div className='h-[90vh] bg-gray-800 flex'>
      <div className='h-full w-1/2 bg-emerald-500 flex flex-col items-center justify-center gap-6'>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className='text-gray-800 text-5xl font-bold'
      >
        Welcome back!
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className='text-gray-800 text-2xl'
      >
        To keep connected with us, please login with your personal info.
      </motion.div>
    </div>

      <div className='h-full w-1/2  flex items-center justify-center'>
      <div className='w-1/2 h-2/3 border border-emerald-600 rounded-xl bg-gray-800 p-6'>
      <form
      onSubmit={handleSubmit}
      
      >
          <div className="mb-9">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-2xl bg-emerald-500 border border-gray-300 p-2 focus:border-emerald-500 focus:outline-none focus:ring"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-9">
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-2xl bg-emerald-500 border border-gray-300 p-2 focus:border-emerald-500 focus:outline-none focus:ring"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full rounded-2xl bg-emerald-500 px-4 py-2 text-gray-800 font-bold hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-blue-300 "
          >
           {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <a href="/signup" className="text-emerald-500 hover:underline">Sign up</a>
        </p>
      </div>
      </div>
    </div>
  )
}

export default LoginPage
