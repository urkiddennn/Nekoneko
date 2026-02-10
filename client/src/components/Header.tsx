import React, { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleProfile = () => {
    navigate("/profile");
    setIsMenuOpen(false);
  };

  const handleMessage = () => {
    navigate("/message");
    setIsMenuOpen(false);
  };

  if (!user) return null;

  return (
    <header className="h-16 border-b border-gray-100 flex items-center justify-between px-6 md:px-8 bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div
        className="font-black text-xl tracking-tighter cursor-pointer"
        onClick={() => {
          navigate("/dashboard");
          setIsMenuOpen(false);
        }}
      >
        nekoneko
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <button
          className="text-xs font-semibold tracking-widest text-gray-600 hover:text-gray-900 transition-colors"
          onClick={handleMessage}
        >
          Messages
        </button>

        <button
          className="w-10 h-10 overflow-hidden border border-slate-200 rounded-full hover:border-slate-500 duration-100 transition-all active:scale-95"
          onClick={handleProfile}
        >
          <img
            src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.name}`}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>

        <button
          onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-200 md:hidden shadow-xl shadow-gray-200/50">
          <div className="flex items-center gap-4 pb-6 border-b border-gray-50">
            <div className="w-12 h-12 overflow-hidden border border-slate-200 rounded-full">
              <img
                src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.name}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-400 font-mono">
                @{user.name.toLowerCase().replace(/\s+/g, "")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <button
              className="text-sm font-bold tracking-widest text-gray-600 hover:text-gray-900 transition-colors text-left"
              onClick={handleMessage}
            >
              Messages
            </button>
            <button
              className="text-sm font-bold tracking-widest text-gray-600 hover:text-gray-900 transition-colors text-left"
              onClick={handleProfile}
            >
              Profile Settings
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-900 text-white px-4 py-3 rounded-lg text-xs font-bold hover:bg-black transition-all active:scale-95 text-center mt-2"
            >
              Logout Session
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
