import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavigationBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 md:px-8 bg-[#0b0b0b]/80 backdrop-blur-md fixed top-0 w-full z-50">
      <Link
        to="/"
        className="font-black text-xl tracking-tighter cursor-pointer text-white"
      >
        nekoneko
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          to="/showcase"
          className="text-xs font-semibold tracking-widest text-gray-400 hover:text-white transition-colors"
        >
          Showcase
        </Link>
        <Link
          to="/docs"
          className="text-xs font-semibold tracking-widest text-gray-400 hover:text-white transition-colors"
        >
          Docs
        </Link>
        <Link
          to="/login"
          className="text-xs font-semibold tracking-widest text-gray-400 hover:text-white transition-colors"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition-all active:scale-95"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#0b0b0b] border-b border-white/[0.06] p-6 flex flex-col gap-6 md:hidden animate-in slide-in-from-top-4 duration-200">
          <Link
            to="/showcase"
            onClick={() => setIsMenuOpen(false)}
            className="text-sm font-bold tracking-widest text-gray-400 hover:text-white transition-colors text-left"
          >
            Showcase
          </Link>
          <Link
            to="/docs"
            onClick={() => setIsMenuOpen(false)}
            className="text-sm font-bold tracking-widest text-gray-400 hover:text-white transition-colors text-left"
          >
            Docs
          </Link>
          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="text-sm font-bold tracking-widest text-gray-400 hover:text-white transition-colors text-left"
          >
            Login
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsMenuOpen(false)}
            className="bg-white text-black px-4 py-3 rounded-lg text-xs font-bold hover:bg-gray-200 transition-all active:scale-95 text-center"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
