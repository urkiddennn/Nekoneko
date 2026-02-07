import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGetStarted = () => {
    navigate("/signup");
    setIsMenuOpen(false);
  };
  const handleDocs = () => {
    navigate("/docs");
    setIsMenuOpen(false);
  };
  const handleLogin = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };
  return (
    <nav className="h-16 border-b border-gray-100 flex items-center justify-between px-6 md:px-8 bg-white/80 backdrop-blur-md fixed top-0 w-full z-50">
      <div
        className="font-black text-xl tracking-tighter cursor-pointer"
        onClick={() => navigate("/")}
      >
        nekoneko
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <button
          onClick={handleDocs}
          className="text-xs font-semibold tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
        >
          Docs
        </button>
        <button
          onClick={handleLogin}
          className="text-xs font-semibold tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
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

      {/* Mobile Toggle */}
      <button
        className="md:hidden p-2 text-gray-400 hover:text-gray-900 transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-6 md:hidden animate-in slide-in-from-top-4 duration-200">
          <button
            onClick={handleDocs}
            className="text-sm font-bold tracking-widest text-gray-400 hover:text-gray-900 transition-colors text-left"
          >
            Docs
          </button>
          <button
            onClick={handleLogin}
            className="text-sm font-bold tracking-widest text-gray-400 hover:text-gray-900 transition-colors text-left"
          >
            Login
          </button>
          <button
            onClick={handleGetStarted}
            className="bg-gray-900 text-white px-4 py-3 rounded text-xs font-bold hover:bg-black transition-all active:scale-95 text-center"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
