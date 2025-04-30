import React from 'react';
import { FaBookmark, FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; //
import { ROUTES } from '../../const/Routes'; // 

import Boton from '../Boton/Boton'; 

const Cabecera = () => {
  const navigate = useNavigate(); // 

  const clickPeliculas = () => {
    navigate(ROUTES.peliculas);
  };

  return (
    <header className="flex items-center justify-between px-4 py-6 border shadow bg-white">
      <div className="flex items-center space-x-4">
        {/* Logo que podría ser un componente */}
        <div className="text-red-600 text-2xl font-bold tracking-wider" style={{ transform: "scaleX(1.1)" }}>
          NERDFLIX
        </div>

        <nav className="flex space-x-6 text-gray-700 text-md font-medium">
          <Boton texto="Peliculas" onClick={clickPeliculas}/>
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
