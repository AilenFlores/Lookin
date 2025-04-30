import React from 'react';
import { FaBookmark, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom'; // nose si esto esta bien

const Cabecera = () => {
  return (
    <header className="flex items-center justify-between px-4 py-6 border shadow bg-white">
      <div className="flex items-center space-x-4">
        {/* Logo que podria ser un componente*/}
        <div className="text-red-600 text-2xl font-bold tracking-wider" style={{ transform: "scaleX(1.1)" }}>
          NERDFLIX
        </div>

        <nav className="flex space-x-6 text-gray-700 text-md font-medium">
          {/* nose si es asi */}
          <Link to="/peliculas" className="hover:text-red-500 transition duration-200">Películas</Link>
          <Link to="/series" className="hover:text-red-500 transition duration-200">Series</Link>
        </nav>
      </div>

      {/* Derecha: iconos */}
      <div className="flex items-center space-x-4">
        <FaBookmark className="text-2xl cursor-pointer" />
        <button className="px-2 py-1 border rounded text-sm">EN</button>
        <FaSearch className="text-2xl cursor-pointer" />
      </div>
    </header>
  );
};

export default Cabecera;



