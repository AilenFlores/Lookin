import React from 'react';
import Titulo from '../Titulo/Titulo';
import Subtitulo from '../Subtitulo/Subtitulo';
import GuardarFavorito from '../GuardarFavorito/GuardarFavorito';
import BurbujaFlotante from '../BurbujaFlotante/BurbujaFlotante';
import { useTranslation } from 'react-i18next';

const Tarjeta = ({ contenido, tipo, mediaType }) => {
  const { t, i18n } = useTranslation("tarjeta");
  const media = mediaType || contenido.media_type;

  if (media === 'person') {
    return (
      <div className="rounded-md shadow flex flex-col overflow-hidden w-24 text-center">
        <img
          src={`https://image.tmdb.org/t/p/w185${contenido.profile_path}`}
          alt={contenido.name}
          className="w-full h-28 object-cover rounded-md border-1 border-white"
        />
       <Subtitulo texto={contenido.name} className="text-xs mt-1 bg-white rounded-md" />
      </div>
    );
  }

  const tamanioImg  = tipo === "grande" ? "w500" : "w185";
  const tamanioCard = tipo === "grande" ? "w-55 h-[350px]" : "w-32 h-48";

  return (
<BurbujaFlotante pelicula={contenido} mediaType={media}>
  <div className={`relative rounded-xl border border-purple-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:scale-[1.03] transition-transform duration-300 ease-in-out flex flex-col overflow-hidden ${tamanioCard}`}>
    {tipo === "grande" && (
      <div className="absolute top-1 right-1 z-10">
        <GuardarFavorito pelicula={contenido} />
      </div>
    )}
    <img
      src={`https://image.tmdb.org/t/p/${tamanioImg}${contenido.poster_path}`}
      alt={contenido.title || contenido.name}
      className="w-full object-cover h-[80%]"
    />
    <div className={`flex flex-col justify-center flex-grow bg-gradient-to-b from-purple-100 via-white to-purple-50 ${tipo === "grande" ? "p-3" : "p-2"}`}>
      <Titulo
        texto={contenido.title || contenido.name}
        className={`pb-1 text-center leading-tight text-purple-800 line-clamp-1 ${tipo === "grande" ? "text-base font-semibold" : "text-sm font-medium"}`}
      />
      {tipo === "grande" && (
        <Subtitulo
          texto={media === 'movie' ? t('tarjeta.pelicula') : t('tarjeta.serie')}
          className="text-center text-purple-600 text-xs"
        />
      )}
    </div>
  </div>
</BurbujaFlotante>

  );
};

export default Tarjeta;
