import React from 'react';
import Titulo from '../Titulo/Titulo';

const SeccionTrailer = ({ videoKey }) => {
  if (!videoKey) return null;

  return (
    <div id="trailer" className="scroll-mt-[140px]">
      <Titulo
  texto="Trailer"
  className="text-3xl md:text-4xl font-semibold text-black pl-6 border-l-4 border-purple-600 mb-4 text-left"
/>

      <div className="mx-auto w-full md:w-3/4 lg:w-5/2 max-w-4xl">
        <div className="aspect-video rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="Trailer"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default SeccionTrailer;