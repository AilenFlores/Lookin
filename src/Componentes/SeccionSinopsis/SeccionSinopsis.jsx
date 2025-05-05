import React, { useState } from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';
import GuardarFavorito from '../GuardarFavorito/GuardarFavorito';
import Cargando from '../Cargando/Cargando';

const SeccionSinopsis = ({ data }) => {
  const [imagenCargando, setImagenCargando] = useState(true);

  const contenidoDesdeData = {
    id: data.id,
    title: data.title,
    name: data.name,
    original_name: data.original_name || data.original_title || data.name || data.title,
    poster_path: data.poster_path,
    backdrop_path: data.backdrop_path,
    overview: data.overview,
    vote_average: data.vote_average,
    vote_count: data.vote_count,
    media_type: data.media_type || (data.first_air_date ? "tv" : "movie"),
    first_air_date: data.first_air_date,
    release_date: data.release_date,
    genre_ids: data.genres?.map(g => g.id), // puede que no lo necesites
    original_language: data.original_language,
    origin_country: data.origin_country || data.production_countries?.map(c => c.iso_3166_1),
  };  

  return (
    <div
      className="scroll-mt-[180px] flex flex-col md:flex-row gap-6 p-6 bg-purple-200 rounded-lg shadow"
      id="sinopsis"
    >
      {/* Imagen y botón de favorito */}
      <div className="w-full md:w-1/4 flex-shrink-0">
        <div className="relative rounded-lg shadow-lg">
          
          {/* Spinner de carga */}
          {imagenCargando && (
            <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-20 rounded-lg">
              <Cargando fullScreen={false} />
            </div>
          )}

          <img
            src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
            alt="Poster"
            className="w-full object-cover rounded-lg outline-6 outline-purple-400"
            onLoad={() => setImagenCargando(false)}
          />

          <div className="absolute top-2 right-2 z-30">
          <GuardarFavorito pelicula={contenidoDesdeData} />
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
