// Componentes/Detalle/SeccionDondeVerla.jsx
import React from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';

const SeccionDondeVerla = ({ data }) => {
  const plataformas = data["watch/providers"]?.results?.AR?.flatrate || [];

  if (plataformas.length === 0) return null;

  return (
    <div id="ver" className="scroll-mt-[180px]">
      <Subtitulo texto="¿Dónde puedo verla?" className="font-semibold text-left text-4xl mb-5" />
      <div className="flex gap-4 flex-wrap">
        {plataformas.map(p => (
          <div
            key={p.provider_id}
            className="flex flex-col items-center w-24 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}
              alt={p.provider_name}
              className="h-20 object-contain drop-shadow-md"
            />
            <span className="text-sm text-gray-700 mt-1 text-center">{p.provider_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeccionDondeVerla;
