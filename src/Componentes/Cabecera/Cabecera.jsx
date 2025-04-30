import React from 'react';
import { FaBookmark, FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; //
import { ROUTES } from '../../const/routes'; // 

import Boton from '../Boton/Boton'; 

const Cabecera = () => {
  const navigate = useNavigate(); // 

  // const clickPeliculas = () => {
  //   navigate(ROUTES.peliculas);
  // };
  function handleClick(ruta) {
    return navigate(ruta);
  }
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-6 border shadow bg-white">
      <div className="flex items-center space-x-4">
        {/* Logo que podría ser un componente */}
        <div
          className="text-red-600 text-2xl font-bold tracking-wider cursor-pointer"
          style={{ transform: "scaleX(1.1)" }}
          onClick={() => navigate(ROUTES.inicio)}
        >
  NERDFLIX
</div>


        <nav className="flex space-x-6 text-gray-700 text-md font-medium">
          {/* <Boton texto="Peliculas" onClick={clickPeliculas}/> */}
          <Boton texto="Películas" onClick={() => handleClick(ROUTES.peliculas)} />
          <Boton texto="Series" onClick={() => handleClick(ROUTES.series)} />
        </nav>
      </div>

      {/* Derecha: iconos */}
      <div className="flex items-center space-x-4">
        <FaBookmark 
          className="text-2xl cursor-pointer"
          onClick={() => navigate(ROUTES.favoritos)}
        />
        <button className="px-2 py-1 border rounded text-sm">EN</button>
        <FaSearch className="text-2xl cursor-pointer" />
      </div>
    </header>
  );
};

export default Cabecera;
