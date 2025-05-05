import React from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';
import Carrusel from '../Carrusel/Carrusel';
import { useTranslation } from 'react-i18next';

const SeccionSimilares = ({ data, tipo }) => {
  const { t } = useTranslation("detalle");
  
  if (!data?.similar?.results?.length) return null;

  return (
    <div id="similares" className="scroll-mt-[140px]">
      <Subtitulo texto={t("titulosSimilares.titulosSimilares")} className="font-semibold text-left text-4xl mb-2" />
      <Carrusel contenido={data.similar.results} tipo="grande" mediaType={tipo} />
    </div>
  );
};

export default SeccionSimilares;
