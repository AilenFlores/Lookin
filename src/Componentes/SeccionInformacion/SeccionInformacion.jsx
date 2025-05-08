import React from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';
import { useTranslation } from 'react-i18next';
import InfoItem from '../InfoItem/InfoItem';
import InfoList from '../InfoLista/InfoLista';
import Titulo from '../Titulo/Titulo';

const Informacion = ({ data }) => {
  const { t } = useTranslation("detalle");

  return (
    <div id="info" className="scroll-mt-[140px] space-y-4 text-left">
      <Titulo
        texto={t("informacion.informacion")}
        className="text-3xl text-left md:text-4xl font-semibold text-black pl-6 border-l-4 border-purple-600 mb-4"
      />
      <div className="space-y-3">
        <InfoItem
          label={`${t("informacion.director")}:`}
          value={data.created_by?.[0]?.name || t('informacion.noDisponible')}
        />
        <InfoList
          label={`${t("informacion.genero")}:`}
          items={data.genres}
        />
        <InfoItem
          label={`${t("informacion.idiomaOriginal")}`}
          value={data.original_language?.toUpperCase() || t('informacion.noDisponible')}
        />
        <InfoList
          label={`${t("informacion.compañiasDeProduccion")}:`}
          items={data.production_companies}
        />
        <InfoItem
          label={`${t("informacion.presupuesto")}:`}
          value={data.budget ? `$${data.budget.toLocaleString()}` : t('informacion.noDisponible')}
        />
        <InfoItem
          label={`${t("informacion.recaudacion")}:`}
          value={data.revenue ? `$${data.revenue.toLocaleString()}` : t('informacion.noDisponible')}
        />
        <div className="flex items-center gap-2 relative group">
          <Subtitulo texto={`${t("informacion.popularidad")}:`} className="font-bold" />
          <div className="flex items-center gap-1 relative">
            <Subtitulo
              texto={`🔥 ${data.popularity?.toFixed(1) || t('informacion.noDisponible')}`}
              className= "shadow-[0_4px_05px_rgba(0,0,0,0.5)] bg-purple-200 px-3 py-1 rounded-full text-sm"
            />
            <span className="text-gray-600 text-xs cursor-pointer select-none relative" tabIndex={0}>
              ℹ️
              <div className="absolute left-1/2 -translate-x-1/2 top-[150%] md:left-full md:top-1/2 md:-translate-y-1/2 md:ml-2 w-[220px] bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-50 text-center shadow-lg">
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