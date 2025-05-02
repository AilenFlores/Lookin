import React from 'react';
import Titulo from '../Titulo/Titulo';
import Subtitulo from '../Subtitulo/Subtitulo';
import GuardarFavorito from '../GuardarFavorito/GuardarFavorito';
import BurbujaFlotante from '../BurbujaFlotante/BurbujaFlotante';

const Tarjeta = ({ contenido, tipo }) => {
    
    let tamanioImg = tipo === "grande" ? "w500" : "w185";
    let tamanioCard = tipo === "grande" ? "w-55 h-[350px]" : "w-32 h-48"; 

  return (
    <BurbujaFlotante pelicula={contenido} mediaType={contenido.media_type}>
      <div className={`rounded-md hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col overflow-hidden ${tamanioCard}`}>
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
  
        <div className={`bg-gray-800 flex flex-col justify-center flex-grow ${
          tipo === "grande" ? "p-2" : "p-1"
        }`}>
          <Titulo
            texto={contenido.title || contenido.name}
            className={`text-center leading-tight line-clamp-1 text-white ${
              tipo === "grande" ? "text-base font-semibold" : "text-sm font-medium"
            }`}
          />
          {tipo === "grande" && (
            <Subtitulo
              texto={contenido.media_type === 'movie' ? 'Película' : 'Serie'}
              className={`text-center mt-0.5 text-gray-400 ${
                tipo === "grande" ? "text-sm" : "text-xs"
              }`} 
            />
          )}
        </div>
      </div>
    </BurbujaFlotante >
  );
  
};

export default Tarjeta;
