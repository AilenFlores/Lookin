import React from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';

const SeccionTrailer = ({ videoKey }) => {
  if (!videoKey) return null;

  return (
    <div id="trailer" className="scroll-mt-[180px]">
      <Subtitulo texto="Trailer" className="font-semibold text-left text-4xl mb-2" />
      <div className="mx-auto w-full md:w-3/4 lg:w-5/2 max-w-4xl">
        <div className="aspect-video rounded-lg overflow-hidden shadow">
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
