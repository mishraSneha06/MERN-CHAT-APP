import React from 'react'

const NoChatSelected = () => {
  return (
     <div className='h-[85vh] w-2/3 bg-emerald-500 rounded flex flex-col gap-7 items-center justify-center'>
        <div className='text-3xl font-bold text-gray-800'>Welcome to</div>
        <div className='text-5xl text-gray-800 font-bold tracking-wider'>TALK - A - TIVE!</div>
        <p className='text-sm text-gray-700 '>Select a conversation from the Sidebar to start chatting.</p>
      
    </div>
  )
}

export default NoChatSelected
