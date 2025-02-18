import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 border-b rounded border-gray-500 bg-gray-800">
      <div className="flex items-center justify-between flex-wrap gap-3">
        {/* User Section */}
        <div className="flex items-center gap-3  sm:items-start">
          {/* Avatar */}
          <div className="size-12 rounded-full overflow-hidden border border-gray-600">
            <img
              src={selectedUser?.profilePic || "/avatar.png"}
              alt={selectedUser?.fullName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */} 
          <div className="text-left flex flex-col">
            <h3 className="font-medium text-white text-lg">{selectedUser?.fullName}</h3>
            <p className="text-sm text-gray-400">
              {onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full hover:bg-gray-700 transition sm:p-1"
        >
          <X className="text-gray-500 w-6 h-6 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
