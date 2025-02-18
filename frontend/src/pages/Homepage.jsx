import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';


const Homepage = () => {
  const {selectedUser} = useChatStore();


  return (
    <div className='h-[90vh] w-full bg-gray-800 flex items-center justify-center gap-5 p-3 '>
      <Sidebar />
      {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
    </div>
  
  )
}

export default Homepage
