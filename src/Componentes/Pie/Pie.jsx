import React from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';

const Pie = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">

        <div className="mb-4 md:mb-0 text-center md:text-left">
          <Subtitulo texto="Nerdfilx" className="text-2xl font-bold md:mb-0" />
          <Subtitulo texto="Tu universo de peliculas y series favoritas" className="text-gray-400" />
          <Subtitulo texto="Este producto utiliza la API de TMDb bajo los términos de uso de su servicio, pero no está respaldado ni certificado por TMDb." className="text-gray-500" />
        </div>

        <div className="flex gap-6 text-gray-400 mt-4 md:mt-0">
          {/* esto podria ser el mismo componente q se haga en el header */}
          <a href="#" className="hover:text-white">Inicio</a>
          <a href="#" className="hover:text-white">Peliculas</a>
          <a href="#" className="hover:text-white">Series</a>
          <a href="#" className="hover:text-white">Ayuda</a>
        </div>
      </div>
    </footer>
  );
};

export default Pie;
