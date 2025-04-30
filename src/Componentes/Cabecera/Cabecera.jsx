import React from 'react';
import { FaBookmark, FaSearch } from "react-icons/fa";

const Cabecera =() => {
  return (
    <header className="flex items-center justify-between px-4 py-6 border shadow bg-white">
      {/* Logo */}
      <div className="text-red-600 text-2xl font-bold tracking-wider" style={{ transform: "scaleX(1.1)" }}>
        NERDFLIX
      </div>

      {/* Iconos */}
      <div className="flex items-center space-x-4">
        <FaBookmark className="text-2xl cursor-pointer" />
        <button className="px-2 py-1 border rounded text-sm">EN</button>
        <FaSearch className="text-2xl cursor-pointer" />
      </div>
    </header>
  );
}
export default Cabecera;
