import React, { useState } from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';
import GuardarFavorito from '../GuardarFavorito/GuardarFavorito';
import Cargando from '../Cargando/Cargando';
import { useTranslation } from 'react-i18next';
import InfoBasica from '../InfoBasica/InfoBasica';
import Titulo from '../Titulo/Titulo';

const SeccionSinopsis = ({ data }) => {
  const [imagenCargando, setImagenCargando] = useState(true);
  const {t } = useTranslation("varios");
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
    genre_ids: data.genres?.map(g => g.id),
    original_language: data.original_language,
    origin_country: data.origin_country || data.production_countries?.map(c => c.iso_3166_1),
  };  

  return (
    <div
      className="scroll-mt-[180px] flex flex-col md:flex-row gap-6 p-6 bg-purple-200 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
      id="sinopsis"
    >
      <div className="w-full md:w-1/4 flex-shrink-0 mb-4 md:mb-0">
        <div className="relative rounded-lg shadow-lg">
          {imagenCargando && (
            <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-20 rounded-lg ">
              <Cargando fullScreen={false} />
            </div>
          )}
          <img
            src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
            alt="Poster"
            className="w-full object-cover rounded-lg outline-6 outline-purple-400 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            onLoad={() => setImagenCargando(false)}
          />
          <div className="absolute top-2 right-2 z-30">
          <GuardarFavorito pelicula={contenidoDesdeData} />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <Titulo
          texto={data.title || data.name}
          className="font-bold text-left text-2xl sm:text-3xl md:text-4xl pb-1"
        />
        <InfoBasica
          vote_average={data.vote_average}
          runtime={data.runtime}
          release_date={data.release_date}
          first_air_date={data.first_air_date}
          certificacion={data.certificacion}
        />
        <Subtitulo className="text-base sm:text-lg leading-relaxed text-gray-800 text-left px-1 sm:px-0">
          {data.overview || t("sinopsis.sinopsisNoDisponible")}
        </Subtitulo>
      </div>
    </div>
  );
};

export default SeccionSinopsis;