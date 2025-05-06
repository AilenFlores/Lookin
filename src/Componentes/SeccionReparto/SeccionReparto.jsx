import React from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';
import Carrusel from '../Carrusel/Carrusel';
import { useTranslation } from 'react-i18next';

const SeccionReparto = ({ reparto }) => {
    const { t } = useTranslation("detalle");
  
  if (!reparto?.length) return null;

  return (
    <div id="reparto" className="scroll-mt-[140px]">
      <Subtitulo texto={t("detalle.reparto")} className="font-semibold text-left text-4xl mb-2" />
      <Carrusel
        contenido={reparto.slice(0, 10)}
        tipo="pequeno"
        mediaType="person"
      />
    </div>
  );
};

export default SeccionReparto;
