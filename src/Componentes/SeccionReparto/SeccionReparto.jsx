import React from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';
import Carrusel from '../Carrusel/Carrusel';

const SeccionReparto = ({ reparto }) => {
  if (!reparto?.length) return null;

  return (
    <div id="reparto" className="scroll-mt-[180px]">
      <Subtitulo texto="Reparto" className="font-semibold text-left text-4xl mb-2" />
      <Carrusel
        contenido={reparto.slice(0, 10)}
        tipo="pequeno"
        mediaType="person"
      />
    </div>
  );
};

export default SeccionReparto;
