import React from "react";
import Boton from "../Boton/Boton";
import Titulo from "../Titulo/Titulo";
import Tarjeta from '../Tarjeta/Tarjeta';

const Lista = ({ peliculas, cargarMas, texto }) => {

  return (
 <div className="bg-white shadow-md p-5 rounded-lg border-2 border-gray-300 ml-7 mr-7 sm:mr-0 mt-2">
  <Titulo texto={texto} className="text-2xl text-red-600 font-bold mb-5 mt-5 tracking-wider cursor-pointer" />

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 justify-items-center">
    {peliculas.length > 0 ? (
      peliculas.map((pelicula) => (
        <Tarjeta key={pelicula.id} contenido={pelicula} tipo="grande" />
      ))
    ) : (
      <p className="col-span-full text-center text-gray-500">No hay resultados.</p>
    )}
  </div>

  {cargarMas && peliculas.length >= 20 && ( 
    <div className="mt-4 flex justify-center">
      <Boton texto="Mostrar Más" onClick={cargarMas} className="bg-black hover:bg-red-600 w-350" />
    </div>
  )}
</div>

  );
};

export default Lista;
