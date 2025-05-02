import React from "react";
import Boton from "../Boton/Boton";
import Titulo from "../Titulo/Titulo";
import Tarjeta from '../Tarjeta/Tarjeta';

const Lista = ({ peliculas, cargarMas, texto }) => {

  return (
    <div className="bg-neutral-100 p-5 m-5 rounded-lg border-2 border-gray-300 shadow-lg">
      <Titulo texto={texto} className="text-2xl mb-5 mt-5 text-black" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-2 justify-items-center">
        {peliculas.map((pelicula) => (
          <Tarjeta contenido={pelicula} tipo={"grande"} />
        ))}
      </div>

      {cargarMas && (
        <div className="mt-4 flex justify-center">
          <Boton texto="Cargar más" onClick={cargarMas} />
        </div>
      )}
    </div>
  );
};

export default Lista;
