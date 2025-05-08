import React from 'react';
import Titulo from '../Titulo/Titulo';
import AcordeonTemporadas from '../AcordeonTemporadas/AcordeonTemporadas';
import { useTranslation } from "react-i18next";

const SeccionTemporadas = ({ data, id }) => {
  if (!data.seasons?.length) return null;
  const { t } = useTranslation("detalle");

  return (
    <div id="temporadas" className="scroll-mt-[140px]">
      <Titulo
        texto={t("detalle.temporada")}
        className="text-3xl md:text-4xl font-semibold text-black pl-6 border-l-4 border-purple-600 mb-4 text-left"
      />
      <div className="flex flex-wrap gap-4 ">
        {data.seasons.map(season => (
          <AcordeonTemporadas
            key={season.id}
            tvId={id}
            seasonNumber={season.season_number}
            posterPath={season.poster_path}
            name={season.name}
          />
        ))}
      </div>
    </div>
  );
};

export default SeccionTemporadas;