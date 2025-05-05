import React from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';

const Pie = () => {
  return (
    <footer className="bg-black text-white py-8 mt-0 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">

        <div className="mb-6 md:mb-0 text-center md:text-left">
          <Subtitulo texto="Nerdflix" className="text-3xl font-bold text-white mb-2" />
          <Subtitulo texto="Tu universo de películas y series favoritas" className="text-gray-400 mb-3" />
          <Subtitulo texto="Más de 10,000 títulos disponibles en HD y 4K, con nuevos lanzamientos cada semana." className="text-gray-500 mb-3" />
          <Subtitulo texto="Únete a millones de usuarios en todo el mundo disfrutando de contenido exclusivo, desde clásicos hasta los estrenos más esperados." className="text-gray-500 mb-6" />
          <Subtitulo texto="Este producto utiliza la API de TMDb bajo los términos de uso de su servicio, pero no está respaldado ni certificado por TMDb." className="text-gray-400 text-xs" />
        </div>

      <div className="mt-8 flex justify-center items-center">
        <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="TMDb Logo" className="w-42 h-auto" />
      </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-xs text-gray-400">
        <Subtitulo texto="Plataforma no oficial, basada en datos de TMDb" className="mb-2 text-gray-500" />     
      </div>

     
    </footer>
  );
};

export default Pie;
