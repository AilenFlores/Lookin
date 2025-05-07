import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import Cargando from '../../Componentes/Cargando/Cargando';
import MenuSecciones from '../../Componentes/MenuSecciones/MenuSecciones';
import SeccionInformacion from '../../Componentes/SeccionInformacion/SeccionInformacion';
import SeccionGaleriaImagenes from '../../Componentes/SeccionGaleriaImagenes/SeccionGaleriaImagenes';
import SeccionReparto from '../../Componentes/SeccionReparto/SeccionReparto';
import SeccionTrailer from '../../Componentes/SeccionTrailer/SeccionTrailer';
import SeccionDondeVerla from '../../Componentes/SeccionDondeVerla/SeccionDondeVerla';
import SeccionTemporadas from '../../Componentes/SeccionTemporadas/SeccionTemporadas';
import SeccionSimilares from '../../Componentes/SeccionSimilares/SeccionSimilares';
import SeccionSinopsis from '../../Componentes/SeccionSinopsis/SeccionSinopsis';
import { useTMDB } from '../../Servicios/hooks/useTMDB';
import { useTranslation } from "react-i18next";
import { obtenerCertificacion, obtenerCertificacionSerie } from '../../const/Certificacion';

const DetallePeliculaSerie = () => {
  const { id, tipo } = useParams();
  const navigate = useNavigate();
  const { getDetallePorId } = useTMDB();
  const { i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState('sinopsis');

  const secciones = ['sinopsis', 'info', 'galeria', 'reparto', 'trailer', 'ver', 'similares'];
  if (tipo === 'tv') secciones.splice(6, 0, 'temporadas');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setData(null);
    setSeccionActiva('sinopsis');

    const obtenerDatos = async () => {
      const resultado = await getDetallePorId(id, tipo, i18n.language);

      if (resultado && resultado.id) {
        const certificacion = tipo === 'movie'
          ? obtenerCertificacion(resultado.release_dates)
          : obtenerCertificacionSerie(resultado.content_ratings);
        setData({ ...resultado, certificacion });
        setError(false);
      } else {
        navigate('*', { replace: true });
      }
    };

    obtenerDatos();
  }, [id, tipo, navigate, i18n.language]);

  useEffect(() => {
    const alturaCabecera = 185;
    const manejarScroll = () => {
      for (const seccion of secciones) {
        const el = document.getElementById(seccion);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= alturaCabecera && rect.bottom >= alturaCabecera) {
          setSeccionActiva(seccion);
          break;
        }
      }
    };
    window.addEventListener('scroll', manejarScroll);
    return () => window.removeEventListener('scroll', manejarScroll);
  }, [secciones]);

  useEffect(() => {
    if (!data) return;
    const timeout = setTimeout(() => {
      const alturaCabecera = 185;
      for (const seccion of secciones) {
        const el = document.getElementById(seccion);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= alturaCabecera && rect.bottom >= alturaCabecera) {
          setSeccionActiva(seccion);
          break;
        }
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [data]);

  if (error) return <div className="text-white p-5">Error al cargar los datos.</div>;
  if (!data) return <Cargando />;

  return (
    <div className="bg-gradient-to-b from-white via-purple-800 to-purple-800 min-h-screen ">
      <Cabecera />
      <MenuSecciones 
        sections={secciones} 
        data={data} 
        activeSection={seccionActiva} 
      />
      <div className="min-h-screen p-5 md:p-9">
        <div className="bg-white m-0,5 rounded-lg border-2 border-gray-300 shadow-lg">
          <div className="pt-[50px] p-8 md:px-15 bg-white-100 text-black space-y-8">
            <SeccionSinopsis data={data} />
            <SeccionInformacion data={data} />
            <SeccionGaleriaImagenes posters={data.images?.posters} backdrops={data.images?.backdrops} />
            <SeccionReparto reparto={data.credits?.cast} />
            {data.videos?.results?.length > 0 && (
              <SeccionTrailer videoKey={data.videos.results[0].key} />
            )}
            <SeccionDondeVerla data={data} />
            {tipo === 'tv' && <SeccionTemporadas data={data} id={id} />}
            <SeccionSimilares data={data} tipo={tipo} />
          </div>
        </div>
      </div>
      <Pie />
    </div>
  );
};

export default DetallePeliculaSerie;