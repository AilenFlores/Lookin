import React, { useState, useEffect } from 'react';
import Boton from '../Boton/Boton';
import Subtitulo from '../Subtitulo/Subtitulo';
import { useNavigate } from 'react-router-dom';

function BurbujaFlotante({ pelicula, mediaType = pelicula.media_type, children }) {
  const [isHovered, setIsHovered] = useState(false);
  const [info, setInfo] = useState(null);

  const API_KEY = 'f0bbdd09a3268c4fe8d469dc1db26b5c';
  const navigate = useNavigate();

  useEffect(() => {
    setInfo(null); // Limpiar cuando cambia la película o el tipo
  }, [pelicula.id, mediaType]);


  useEffect(() => {
    if (isHovered && !info) {
      fetch(`https://api.themoviedb.org/3/${mediaType}/${pelicula.id}?api_key=${API_KEY}&language=es`)
        .then(res => res.json())
        .then(data => {
          setInfo({
            sinopsis: data.overview,
            genero: data.genres?.map(g => g.name).join(', '),
          });
        });
    }
  }, [isHovered, info, pelicula.id, mediaType]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      {isHovered && info && (
        <div
        className={`
          absolute z-50
          bottom-0 left-1/2 -translate-x-1/2
          w-56 max-w-[90vw] bg-white text-black shadow-lg rounded-md p-2 text-xs
          transition-all duration-200 pointer-events-auto`}>
            <Subtitulo texto={
              <>
              <span className="font-bold text-xs">Género: </span>
              <span className="text-xs">{info.genero || "No disponible"}</span>
              </>}
              className="text-center"
            />
            <Subtitulo texto={
              <>
              <span className="font-bold text-xs">Sinopsis: </span>
              <span className="text-xs">{info.sinopsis ? info.sinopsis.length > 150 ? info.sinopsis.slice(0, 150) + '...': info.sinopsis: 'No disponible'}</span>
              </>}
              className="text-center mt-2"
            />

        <div className="flex justify-center">
          <Boton texto="+ Info" onClick={() => navigate(`/detalle/${pelicula.id}/${mediaType}`)} className="bg-black hover:bg-red-600" />
        </div>
      </div>
      
      )}
    </div>
  );
}

export default BurbujaFlotante;
