import React from "react";
import Boton from "../Boton/Boton";
import Titulo from "../Titulo/Titulo";
import Tarjeta from '../Tarjeta/Tarjeta';
import CartelAviso from "../CartelAviso/CartelAviso";

const Lista = ({ peliculas, cargarMas, texto, mensajeCartel }) => {

  return (
 <div className="bg-white shadow-md p-5 rounded-lg border-2 border-gray-300 ml-7 mr-7 sm:mr-0 mt-2">
<Titulo 
  texto={texto} 
  className="inline-block max-w-fit text-2xl md:text-3xl font-semibold text-neutral-700 bg-purple-200 backdrop-blur-md rounded-xl px-5 py-3 mt-6 mb-6 shadow-sm tracking-tight"
 />



  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 justify-items-center">
    {peliculas.length > 0 ? (
      peliculas.map((pelicula) => (
        <Tarjeta key={`${pelicula.media_type}-${pelicula.id}`} contenido={pelicula} tipo="grande" />

      ))
    ) : (
      <CartelAviso mensaje={mensajeCartel} />
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
