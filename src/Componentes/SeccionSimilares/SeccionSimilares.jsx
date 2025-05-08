import React from 'react';
import Titulo from '../Titulo/Titulo';
import Carrusel from '../Carrusel/Carrusel';
import { useTranslation } from 'react-i18next';

const SeccionSimilares = ({ data, tipo }) => {
  const { t } = useTranslation("detalle");
  
  if (!data?.similar?.results?.length) return null;

  return (
    <div id="similares" className="scroll-mt-[140px]">
      <Titulo
        texto={t("titulosSimilares.titulosSimilares")}
        className="text-3xl md:text-4xl font-semibold text-black pl-6 border-l-4 border-purple-600 mb-4 text-left"
      />
      <Carrusel contenido={data.similar.results} tipo="grande" mediaType={tipo} />
    </div>
  );
};

export default SeccionSimilares;