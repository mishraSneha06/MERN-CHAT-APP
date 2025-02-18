import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to control mobile menu

  return (
    <div className="w-full bg-gray-900 h-[10vh] text-white flex items-center justify-between p-5 md:px-10">
      {/* Logo */}
      <div className="text-2xl text-emerald-500 tracking-widest font-bold">
        TALK - A - TIVE
      </div>

      {/* Hamburger Menu (for Mobile) */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <i className="fa-solid fa-bars text-2xl text-white"></i>
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center">
        <div className="flex gap-2 items-center text-gray-500 cursor-pointer" onClick={() => navigate("/settings")}>
          <i className="fa-solid fa-gear"></i>
          <div>Settings</div>
        </div>
        {authUser && (
          <>
            <div className="flex gap-2 items-center text-gray-500 cursor-pointer" onClick={() => navigate("/profile")}>
              <i className="fa-solid fa-user"></i>
              <div>Profile</div>
            </div>
            <div className="flex gap-2 items-center text-gray-500 cursor-pointer" onClick={logout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <div>Logout</div>
            </div>
          </>
        )}
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="absolute top-[10vh] left-0 w-full bg-gray-900 flex flex-col items-center gap-4 py-4 md:hidden">
          <div className="flex gap-2 items-center text-gray-500 cursor-pointer" onClick={() => {navigate("/settings"); setIsOpen(false);}}>
            <i className="fa-solid fa-gear"></i>
            <div>Settings</div>
          </div>
          {authUser && (
            <>
              <div className="flex gap-2 items-center text-gray-500 cursor-pointer" onClick={() => {navigate("/profile"); setIsOpen(false);}}>
                <i className="fa-solid fa-user"></i>
                <div>Profile</div>
              </div>
              <div className="flex gap-2 items-center text-gray-500 cursor-pointer" onClick={() => {logout(); setIsOpen(false);}}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <div>Logout</div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
