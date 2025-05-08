import React from 'react';
import Titulo from '../Titulo/Titulo';
import Carrusel from '../Carrusel/Carrusel';
import { useTranslation } from 'react-i18next';

const SeccionReparto = ({ reparto }) => {
  const { t } = useTranslation("detalle");
  
  if (!reparto?.length) return null;

  return (
    <div id="reparto" className="scroll-mt-[140px]">
      <Titulo
        texto={t("detalle.reparto")}
        className="text-3xl md:text-4xl font-semibold text-black pl-6 border-l-4 border-purple-600 mb-4 text-left"
      />
      <Carrusel
        contenido={reparto.slice(0, 10)}
        tipo="pequeno"
        mediaType="person"
      />
    </div>
  );
};

export default SeccionReparto;