import React from 'react'
import { useState, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Image, Send, X } from 'lucide-react'
import toast from 'react-hot-toast'



const MessageInput = () => {

    const [text, setText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const {sendMessage} = useChatStore();

    const handleImageChange = (e) => {
        const file=e.target.files[0];
        if(!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

    };

    const removeImage=() =>{
        setImagePreview(null);
        if(fileInputRef.current) fileInputRef.current.value='';
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if(!text.trim() && !imagePreview) return;
        
        try {
            await sendMessage({
                text:text.trim(), 
                image:imagePreview});

            setText('');
            setImagePreview(null);
            if(fileInputRef.current) fileInputRef.current.value='';
        } catch (error) {
            console.log('Error sending message:', error);
        }
    };


  return (
    <div className="p-4 w-full rounded-lg border border-gray-700 bg-gray-900 shadow-lg">
      {/* Image Preview Section */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-3 p-2 bg-gray-800 rounded-lg shadow-md">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-gray-600 shadow-md"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-700 hover:bg-red-500 text-white flex items-center justify-center transition-all"
              type="button"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Message Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-3 bg-gray-800 p-3 rounded-full shadow-md">
          {/* Text Input */}
          <input
            type="text"
            className="w-full bg-transparent border-none text-white outline-none placeholder-gray-400"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {/* Image Upload Button */}
          <button
            type="button"
            className="text-gray-400 hover:text-emerald-500 transition-all"
            onClick={() => fileInputRef.current?.click()}
            title="Attach Image"
          >
            <Image size={24} />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className={`p-3 rounded-full flex items-center justify-center shadow-md transition-all ${
            text.trim() || imagePreview
              ? "bg-emerald-500 hover:bg-blue-600 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput
