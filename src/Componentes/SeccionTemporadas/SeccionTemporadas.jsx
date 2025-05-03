import React from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';
import AcordeonTemporadas from '../AcordeonTemporadas/AcordeonTemporadas';

const SeccionTemporadas = ({ data, id }) => {
  if (!data.seasons?.length) return null;

  return (
    <div id="temporadas" className="scroll-mt-[180px]">
      <Subtitulo texto="Temporadas" className="font-semibold text-left text-4xl mb-4" />
      <div className="flex flex-wrap gap-4">
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
