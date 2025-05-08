import React, { useState, useEffect } from 'react';
import Boton from '../Boton/Boton';
import Subtitulo from '../Subtitulo/Subtitulo';
import { useNavigate } from 'react-router-dom';
import { useTMDB } from '../../Servicios/hooks/useTMDB';
import { useTranslation } from 'react-i18next';

function BurbujaFlotante({ pelicula, mediaType = pelicula.media_type, children }) {
  const [isHovered, setIsHovered] = useState(false);
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();
  const { getDetallePorId } = useTMDB();
  const {t, i18n } = useTranslation("detalle");

  useEffect(() => {
    setInfo(null); 
  }, [pelicula.id, mediaType, i18n.language]);

  useEffect(() => {
    if (isHovered && !info) {
      getDetallePorId(pelicula.id, mediaType,i18n.language).then(data => {
        setInfo({
          sinopsis: data.overview,
          genero: data.genres?.map(g => g.name).join(', '),
        });
      });
    }
  }, [isHovered, info, pelicula.id, mediaType, i18n.language]);
  
  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children}
      {isHovered && info && (
        <div
        className={`
          absolute z-50
          bottom-0 left-1/2 -translate-x-1/2
          w-56 max-w-[90vw] bg-white text-black shadow-lg rounded-md p-2 text-xs
          transition-all duration-200 pointer-events-auto`}>
            <Subtitulo texto={
              <>
              <span className="font-bold text-xs">{t("informacion.genero")}: </span>
              <span className="text-xs">{info.genero || t("informacion.noDisponible")}</span>
              </>}
              className="text-center"
            />
            <Subtitulo texto={
              <>
              <span className="font-bold text-xs">{t("detalle.sinopsis")}: </span>
              <span className="text-xs">{info.sinopsis ? info.sinopsis.length > 150 ? info.sinopsis.slice(0, 150) + '...': info.sinopsis: t("informacion.noDisponible")}</span>
              </>}
              className="text-center mt-2"
            />
        <div className="flex justify-center">
          <Boton texto="+ Info" onClick={() => navigate(`/detalle/${pelicula.id}/${mediaType}`)} />
        </div>
      </div>
      )}
    </div>
  );
}

export default BurbujaFlotante;
