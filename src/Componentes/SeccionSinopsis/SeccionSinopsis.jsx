import React, { useState } from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';
import GuardarFavorito from '../GuardarFavorito/GuardarFavorito';
import Cargando from '../Cargando/Cargando';

const SeccionSinopsis = ({ data }) => {
  const [isImgLoading, setIsImgLoading] = useState(true);

  return (
    <div
      className="scroll-mt-[180px] flex flex-col md:flex-row gap-6 p-6 bg-purple-100 rounded-lg shadow"
      id="sinopsis"
    >
      {/* Imagen y botón de favorito */}
      <div className="w-full md:w-1/4 flex-shrink-0">
        <div className="relative rounded-lg shadow-lg">
          
          {/* Spinner de carga */}
          {isImgLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-20 rounded-lg">
              <Cargando fullScreen={false} />
            </div>
          )}

          <img
            src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
            alt="Poster"
            className="w-full object-cover rounded-lg outline-6 outline-white"
            onLoad={() => setIsImgLoading(false)}
          />

          <div className="absolute top-2 right-2 z-30">
            <GuardarFavorito pelicula={data} />
          </div>
        </div>
      </div>

      {/* Texto de sinopsis */}
      <div className="flex-1 space-y-4">
        <Subtitulo
          texto={data.title || data.name}
          className="font-bold text-left text-4xl pb-1"
        />
        <div className="flex items-center gap-6 text-sm font-medium text-gray-800">
          <span className="w-9 h-9 rounded-full border-2 border-yellow-500 text-yellow-500 flex items-center justify-center">
            {Math.round(data.vote_average * 10)}%
          </span>
          <span className="border-l border-gray-300 pl-4">
            {data.runtime ? `${data.runtime} min` : 'Duración no disponible'}
          </span>
          <span className="border-l border-gray-300 pl-4">
            {data.release_date?.slice(0, 4) ||
              data.first_air_date?.slice(0, 4) ||
              'Año N/A'}
          </span>
        </div>
        <p className="text-lg leading-relaxed text-gray-800 text-left">
          {data.overview || 'Sin sinopsis disponible.'}
        </p>
      </div>
    </div>
  );
};

export default SeccionSinopsis;
