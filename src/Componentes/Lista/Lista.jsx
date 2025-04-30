import React from "react";
import Boton from "../Boton/Boton";
import Titulo from "../Titulo/Titulo";
import BurbujaFlotante from "../BurbujaFlotante/BurbujaFlotante";

const Lista = ({ peliculas, cargarMas, texto, tipo }) => {
  const handleClick = (pelicula) => {
    console.log(pelicula.id);
  };

  return (
    <div className="bg-neutral-100 p-3">
      <Titulo texto={texto} className="text-2xl mb-5 mt-5 text-black" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center">
        {peliculas.map((pelicula) => (
          <BurbujaFlotante
            key={pelicula.id}
            pelicula={{ ...pelicula, media_type: pelicula.media_type || tipo }}
            onClick={handleClick}
          />
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
