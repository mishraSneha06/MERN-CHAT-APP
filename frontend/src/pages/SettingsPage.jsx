import React, { useState } from "react";

const SettingsPage = () => {
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [profilePic, setProfilePic] = useState(null);
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [lastSeen, setLastSeen] = useState(true);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium">Profile Picture</label>
        <div className="mt-2 flex items-center gap-4">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          )}
          <input type="file" onChange={handleImageUpload} className="text-sm" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <label className="text-sm font-medium">Enable Notifications</label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
          className="toggle-checkbox"
        />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <label className="text-sm font-medium">Enable Sound</label>
        <input
          type="checkbox"
          checked={sound}
          onChange={() => setSound(!sound)}
          className="toggle-checkbox"
        />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <label className="text-sm font-medium">Show Last Seen</label>
        <input
          type="checkbox"
          checked={lastSeen}
          onChange={() => setLastSeen(!lastSeen)}
          className="toggle-checkbox"
        />
      </div>

      <button className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">
        Save Changes
      </button>

      <button className="w-full bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-600">
        Logout
      </button>
    </div>
  );
};

export default SettingsPage;
