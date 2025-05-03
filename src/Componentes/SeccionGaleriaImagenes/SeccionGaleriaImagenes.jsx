import React from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';

const SeccionGaleriaImagenes = ({ posters = [], backdrops = [] }) => {
  const imagenes = [
    ...posters.map(img => ({ ...img, type: 'poster' })),
    ...backdrops.map(img => ({ ...img, type: 'backdrop' }))
  ];

  if (imagenes.length === 0) return null;

  return (
    <div id="galeria" className="py-8 scroll-mt-[150px]">
      <Subtitulo texto="Galería" className="text-4xl font-semibold mb-4 text-left" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {imagenes.map((img, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg">
            <a
              href={`https://image.tmdb.org/t/p/original${img.file_path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${img.file_path}`}
                alt={`${img.type} ${idx + 1}`}
                className="w-full h-32 object-cover rounded-lg transition-transform duration-300 hover:scale-125 cursor-zoom-in"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeccionGaleriaImagenes;
