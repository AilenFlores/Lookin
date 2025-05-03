import React from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';
import Carrusel from '../Carrusel/Carrusel';

const SeccionSimilares = ({ data, tipo }) => {
  if (!data?.similar?.results?.length) return null;

  return (
    <div id="similares" className="scroll-mt-[180px]">
      <Subtitulo texto="Títulos similares" className="font-semibold text-left text-4xl mb-2" />
      <Carrusel contenido={data.similar.results} tipo="grande" mediaType={tipo} />
    </div>
  );
};

export default SeccionSimilares;
