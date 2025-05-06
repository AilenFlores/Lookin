import React from "react";
import Boton from "../Boton/Boton";
import Titulo from "../Titulo/Titulo";
import Tarjeta from '../Tarjeta/Tarjeta';
import { useTranslation } from 'react-i18next';
import CartelAviso from "../CartelAviso/CartelAviso";

const Lista = ({ peliculas, cargarMas, texto, mensajeCartel }) => {
  const { t } = useTranslation("catalogo");

  return (
<div className="bg-white shadow-md p-5 rounded-lg border-2 border-gray-300  sm:mr-0 mt-2">
  <Titulo texto={texto} className="inline-block text-2xl md:text-3xl font-semibold text-neutral-700 rounded-xl px-5 py-3 mt-6 mb-6  "/>

  <div className="grid [grid-template-columns:repeat(auto-fit,_minmax(210px,_1fr))] gap-4 p-2 justify-items-center">
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
      <Boton texto={t("mostrarMas.mostrarMas")} onClick={cargarMas} className="bg-black hover:bg-purple-900 w-350" />
    </div>
  )}
</div>

  );
};

export default Lista;
