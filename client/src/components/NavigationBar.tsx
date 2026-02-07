import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };
  const handleDocs = () => {
    navigate("/docs");
  };
  return (
    <nav className="h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md fixed top-0 w-full z-50">
      <div
        className="font-black text-xl tracking-tighter cursor-pointer"
        onClick={() => navigate("/")}
      >
        nekoneko
      </div>
      <div className="flex items-center gap-6">
        <button
          onClick={handleDocs}
          className="text-xs font-semibold  tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
        >
          Docs
        </button>
        <button
          onClick={() => navigate("/login")}
          className="text-xs font-semibold  tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
        >
          Login
        </button>
        <button
          onClick={handleGetStarted}
          className="bg-gray-900 text-white px-4 py-2 rounded text-xs font-bold hover:bg-black transition-all active:scale-95"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
