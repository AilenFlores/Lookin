import React from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';

const Informacion = ({ data }) => {
  return (
    <div id="info" className="scroll-mt-[140px] space-y-4 text-left">
      <Subtitulo texto="Información" className="font-semibold text-left text-4xl" />

      <div className="space-y-3">
        <div>
          <strong>Director:</strong>{' '}
          <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
            {data.created_by?.[0]?.name || 'No disponible'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <strong>Género:</strong>
          {data.genres?.length ? (
            data.genres.map(g => (
              <span key={g.id} className="bg-purple-200 px-3 py-1 rounded-full text-sm">
                {g.name}
              </span>
            ))
          ) : (
            <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">No disponible</span>
          )}
        </div>

        <div>
          <strong>Idioma original:</strong>{' '}
          <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
            {data.original_language?.toUpperCase() || 'No disponible'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <strong>Compañías de producción:</strong>
          {data.production_companies?.length ? (
            data.production_companies.map(pc => (
              <span key={pc.id} className="bg-purple-200 px-3 py-1 rounded-full text-sm">
                {pc.name}
              </span>
            ))
          ) : (
            <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">No disponible</span>
          )}
        </div>

        <div>
          <strong>Presupuesto:</strong>{' '}
          <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
            {data.budget ? `$${data.budget.toLocaleString()}` : 'No disponible'}
          </span>
        </div>

        <div>
          <strong>Recaudación:</strong>{' '}
          <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
            {data.revenue ? `$${data.revenue.toLocaleString()}` : 'No disponible'}
          </span>
        </div>

        <div className="flex items-center gap-2 relative group">
          <strong>Popularidad:</strong>
          <div className="flex items-center gap-1 relative">
            <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
              🔥 {data.popularity?.toFixed(1) || 'No disponible'}
            </span>
            <span className="text-gray-600 text-xs cursor-pointer select-none relative" tabIndex={0}>
              ℹ️
              <div
                className="absolute left-1/2 -translate-x-1/2 top-[150%] md:left-full md:top-1/2 md:-translate-y-1/2 md:ml-2 
                w-[220px] bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100
                group-focus-within:opacity-100 transition-opacity z-50 text-center shadow-lg"
              >
                Nivel de interés según visualizaciones y actividad reciente.
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Informacion;
