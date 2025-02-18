import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {

    const {messages , getMessages, isMessagesLoading ,selectedUser} = useChatStore();

    const {subscribeToMessages, unsubscribeFromMessages} = useChatStore();

    const {authUser} =useAuthStore();
    const messageEndRef=useRef(null);

      useEffect(() =>{
        getMessages(selectedUser._id);
        subscribeToMessages();

        return () =>unsubscribeFromMessages();
      }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages])

      useEffect(() =>{
        messageEndRef.current?.scrollIntoView({behavior: "smooth"});
      })


    if(isMessagesLoading) return (
        <div className='h-[85vh] w-2/3 overflow-auto flex flex-col gap-4'>
            <ChatHeader />
            <MessageSkeleton />

        </div>
    )

  

  return (
    <div className='bg-gray-800 h-[85vh] w-2/3 flex flex-col gap-1 overflow-auto'>

        <ChatHeader />
        

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
  {messages.map((message) => (
    <div
      key={message._id}
      className={`flex items-end gap-3 ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
      ref={messageEndRef}
    >
      {/* Profile Picture */}
      <div className="avatar">
        <div className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-md overflow-hidden hover:scale-105 transition">
          <img
            src={
              message.senderId === authUser._id
                ? authUser.profilePic || "/avatar.png"
                : selectedUser.profilePic || "/avatar.png"
            }
            alt="profile pic"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Message Bubble */}
      <div
        className={`relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md ${
          message.senderId === authUser._id
            ? "bg-white text-gray-800 border border-gray-300" // Sender's bubble
            : "bg-emerald-500 text-white" // Receiver's bubble
        }`}
      >
        {/* Message Text & Image */}
        {message.image && (
          <img
            src={message.image}
            alt="Attachment"
            className="max-w-[200px] rounded-md mb-2"
          />
        )}
        {message.text && <p className="leading-5">{message.text}</p>}
      </div>

      {/* Timestamp below the bubble */}
      <div className="text-xs text-opacity-70 mt-1">
        <span className="bg-gray-900 text-gray-500 py-1 px-2 rounded-lg">{formatMessageTime(message.createdAt)}</span>
      </div>
    </div>
  ))}
</div>





        <MessageInput />
    
      
    </div>
  )
}

export default ChatContainer
