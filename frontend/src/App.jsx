import { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LogInPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from "lucide-react"
import { Toaster } from 'react-hot-toast'

function App() {
 const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

 console.log({onlineUsers});

 
 useEffect(() => {
  checkAuth();
}, [checkAuth]);

console.log({authUser});

if(isCheckingAuth  && !authUser) return (
  <div className='flex items-center justify-center h-screen'>
    <Loader className='animate-spin size-10'/>
  </div>
)
  
  
  
  return (
  <div>
    <Navbar />

    <Routes>
      <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" />} />
      <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
      <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/settings" element={ <SettingsPage /> } />
      <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
    </Routes>

    <Toaster />
  </div>
      
  )
}

export default App
