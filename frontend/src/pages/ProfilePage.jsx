import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {Camera,  Mail, User} from 'lucide-react'
import { useState } from 'react'


const ProfilePage = () => {

  const {authUser, isUpdatingProfile, updateProfile} = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

 const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = async () => {
    const base64Image = reader.result;
    
    // Check if image is too large (> 8MB) before sending
    const maxSize = 8 * 1024 * 1024; // 8MB limit
    if (base64Image.length > maxSize) {
      alert("Image is too large! Please upload a smaller file.");
      return;
    }

    try {
      setSelectedImg(base64Image); // Update UI
      await updateProfile({ profilePic: base64Image });
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };
};


  return (
    <div className='h-[110vh] w-screen bg-gray-800  flex items-center justify-center flex-col'>
      <div className='w-1/2 h-[100vh] text-center rounded-xl bg-gray-900 p-10  flex flex-col gap-5'>
        <div className='font-bold text-4xl text-emerald-500'>Profile</div>
        <div className='text-2xl text-zinc-400'>Your Profile Information</div>
        {/* avatar upload section */}
       <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

        {/* user info section */}
        <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-emerald-500   rounded-lg ">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-emerald-500  rounded-lg ">{authUser?.email}</p>
            </div>
          </div>
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg text-zinc-400 font-medium  mb-4">Account Information</h2>
            <div className=" text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span className='text-zinc-400'>Member Since</span>
                <span className="text-zinc-400">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className='text-zinc-400'>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      

    
  )
}

export default ProfilePage
