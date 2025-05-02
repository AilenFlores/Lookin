import React, { useState, useEffect } from 'react';
import Boton from '../Boton/Boton';
import { useNavigate } from 'react-router-dom';

function BurbujaFlotante({ pelicula, mediaType = pelicula.media_type, children }) {
  const [isHovered, setIsHovered] = useState(false);
  const [info, setInfo] = useState(null);

  const API_KEY = 'f0bbdd09a3268c4fe8d469dc1db26b5c';
  const navigate = useNavigate();

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
            md:top-1/2 md:left-full md:-translate-y-1/2 md:ml-2
            top-full left-1/2 -translate-x-1/2 mt-3
            w-72 bg-white text-black shadow-2xl rounded-lg p-3 text-sm transition-all duration-300 pointer-events-auto
          `}
        >
          {/* Flechitas */}
          <div className="hidden md:block absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white shadow-sm" />
          <div className="block md:hidden absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white shadow-sm" />

          <p><strong>Género:</strong> {info.genero || 'No disponible'}</p>
          <p className="mt-2"><strong>Sinopsis:</strong> {info.sinopsis || 'No disponible'}</p>

          <div className="flex justify-center mt-3">
            <Boton texto="+ Info" onClick={() => navigate(`/detalle/${pelicula.id}/${mediaType}`)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BurbujaFlotante;
