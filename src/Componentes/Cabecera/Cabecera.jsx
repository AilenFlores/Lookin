import React, { useState, useRef } from 'react';
import { FaBookmark, FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../const/routes';
import Titulo from '../Titulo/Titulo';
import Boton from '../Boton/Boton';
import Enlace from '../Enlace/Enlace';
import ModalBuscador from '../ModalBuscador/ModalBuscador';

const Cabecera = () => {
  const navigate = useNavigate();
  const [mostrarBuscador, setMostrarBuscador] = useState(false);
  const botonBusquedaRef = useRef(null); // 🟣 Referencia al ícono

  return (
    <>
      <header className="sticky top-0 z-[9999] bg-white shadow px-4 h-20 w-full flex items-center">
        <div className="flex justify-between items-center w-full">
          {/* Izquierda: logo y navegación */}
          <div className="flex items-center space-x-6">
            <Titulo
              onClick={() => navigate(ROUTES.inicio)}
              texto="NERDFLIX"
              className="text-red-600 text-xl sm:text-2xl font-extrabold tracking-wider cursor-pointer"
            />
            <nav className="flex space-x-4 text-gray-700 text-sm sm:text-base font-medium">
              <Enlace to="/peliculas">Películas</Enlace>
              <Enlace to="/series">Series</Enlace>
            </nav>
          </div>

          {/* Derecha: íconos */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <FaBookmark
              className="text-xl sm:text-2xl cursor-pointer"
              onClick={() => navigate(ROUTES.favoritos)}
            />
            <Boton
              texto="EN"
              className="!bg-white !text-black !border !border-black hover:!bg-gray-100 !px-2 !py-1 sm:!px-3 sm:!py-2 text-xs sm:text-sm"
              onClick={() => {}}
            />
            <FaSearch
              ref={botonBusquedaRef}
              className="text-xl sm:text-2xl cursor-pointer"
              onClick={() => setMostrarBuscador(prev => !prev)}
            />
          </div>
        </div>
      </header>

      <ModalBuscador
        visible={mostrarBuscador}
        onClose={() => setMostrarBuscador(false)}
        ignoreRef={botonBusquedaRef} // 🟣 se lo pasamos al modal
      />
    </>
  );
};

export default Cabecera;
