import React from 'react';
import { FaBookmark, FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; //
import { ROUTES } from '../../const/routes'; // 
import Titulo from '../Titulo/Titulo';
import Boton from '../Boton/Boton'; 
import Enlace from '../Enlace/Enlace';

const Cabecera = () => {
  const navigate = useNavigate(); 

  // function handleClick(ruta) {
  //   return navigate(ruta);
  // }
  return (
    <header className="sticky top-0 z-[9999] bg-white shadow px-4 h-20 w-full flex items-center">
{/* <header className="sticky top-0 z-[9999] bg-white shadow px-4 py-4 w-full"> */}

      <div className="flex justify-between items-center w-full">
  {/* <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"> */}
    
    {/* Izquierda: logo y navegación */}
      <div className="flex items-center space-x-6">
    {/* <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6"> */}
      
      <Titulo
        onClick={() => navigate(ROUTES.inicio)}
        texto="NERDFLIX"
        className="text-red-600 text-xl sm:text-2xl font-extrabold tracking-wider cursor-pointer"
        // className="text-red-600 text-2xl font-extrabold tracking-wider cursor-pointer" 
      />
        <nav className="flex space-x-4 text-gray-700 text-sm sm:text-base font-medium">
       {/* <nav className="flex space-x-6 text-gray-700 text-md font-medium"> */}
          <Enlace to="/peliculas">Películas</Enlace> 
          <Enlace to="/series">Series</Enlace>
         </nav>       
    </div>

    {/* Derecha: íconos */}
    <div className="flex items-center space-x-3 sm:space-x-4">
    {/* <div className="flex items-center space-x-4"> */}
      <FaBookmark 
          className="text-xl sm:text-2xl cursor-pointer"
        // className="text-2xl cursor-pointer"
        onClick={() => navigate(ROUTES.favoritos)}
      />
      <Boton
        texto="EN"
        className="!bg-white !text-black !border !border-black hover:!bg-gray-100 !px-2 !py-1 sm:!px-3 sm:!py-2 text-xs sm:text-sm"
        // className="!bg-white !text-black !border !border-black hover:!bg-gray-100 !px-3 !py-2 text-sm"
        onClick={() => {}}
      />
      <FaSearch 
          className="text-xl sm:text-2xl cursor-pointer"
        // className="text-2xl cursor-pointer"
        onClick={() =>{}}
 
      />
    </div>
  </div>
</header>
  );
};

export default Cabecera;
