import React from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';
import { useTranslation } from 'react-i18next';

const Informacion = ({ data }) => {
    const { t } = useTranslation("detalle");
  
  return (
    <div id="info" className="scroll-mt-[140px] space-y-4 text-left">
      <Subtitulo texto={t("informacion.informacion")} className="font-semibold text-left text-4xl" />

      <div className="space-y-3">
        <div>
          <strong>{t("informacion.director")}:</strong>{' '}
          <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
            {data.created_by?.[0]?.name || t('informacion.noDisponible')}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <strong>{t("informacion.genero")}:</strong>
          {data.genres?.length ? (
            data.genres.map(g => (
              <span key={g.id} className="bg-purple-200 px-3 py-1 rounded-full text-sm">
                {g.name}
              </span>
            ))
          ) : (
            <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">{t("informacion.noDisponible")}</span>
          )}
        </div>

        <div>
          <strong>{t("informacion.idiomaOriginal")}</strong>{' '}
          <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
            {data.original_language?.toUpperCase() || t('informacion.noDisponible')}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <strong>{t("informacion.compañiasDeProduccion")}</strong>
          {data.production_companies?.length ? (
            data.production_companies.map(pc => (
              <span key={pc.id} className="bg-purple-200 px-3 py-1 rounded-full text-sm">
                {pc.name}
              </span>
            ))
          ) : (
            <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">{t('informacion.noDisponible')}</span>
          )}
        </div>

        <div>
          <strong>{t("informacion.presupuesto")}:</strong>{' '}
          <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
            {data.budget ? `$${data.budget.toLocaleString()}` : t('informacion.noDisponible')}
          </span>
        </div>

        <div>
          <strong>{t("informacion.recaudacion")}:</strong>{' '}
          <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
            {data.revenue ? `$${data.revenue.toLocaleString()}` : t('informacion.noDisponible')}
          </span>
        </div>

        <div className="flex items-center gap-2 relative group">
          <strong>{t("informacion.popularidad")}:</strong>
          <div className="flex items-center gap-1 relative">
            <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
              🔥 {data.popularity?.toFixed(1) || t('informacion.noDisponible')}
            </span>
            <span className="text-gray-600 text-xs cursor-pointer select-none relative" tabIndex={0}>
              ℹ️
              <div
                className="absolute left-1/2 -translate-x-1/2 top-[150%] md:left-full md:top-1/2 md:-translate-y-1/2 md:ml-2 
                w-[220px] bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100
                group-focus-within:opacity-100 transition-opacity z-50 text-center shadow-lg"
              >
                {t("informacion.nivelDeInteres")}
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Informacion;
