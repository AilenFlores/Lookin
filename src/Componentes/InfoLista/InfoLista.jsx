import React from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';
import { useTranslation } from 'react-i18next';

const InfoLista = ({ label, items }) => {
  const { t } = useTranslation("detalle");

  return (
    <div className=" flex flex-wrap items-center gap-2">
      <Subtitulo texto={label} className="font-bold" />
      {items?.length ? (
        items.map(item => (
          <Subtitulo
            key={item.id}
            texto={item.name}
            className=" shadow-[0_4px_05px_rgba(0,0,0,0.5)] bg-purple-200 px-3 py-1 rounded-full text-sm"
          />
        ))
      ) : (
        <Subtitulo
          texto={t("informacion.noDisponible")}
          className="bg-purple-200 px-3 py-1 rounded-full text-sm"
        />
      )}
    </div>
  );
};

export default InfoLista;
