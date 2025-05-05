import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import { getDetallePorId } from '../../Servicios/apiTMDB';
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

const DetallePeliculaSerie = () => {
  const { id, tipo } = useParams();
  const navigate = useNavigate();
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
      const resultado = await getDetallePorId(id, tipo);

      if (resultado && resultado.id) {
        setData(resultado);
        setError(false);
      } else {
        navigate('*', { replace: true });
      }
    };

    obtenerDatos();
  }, [id, tipo, navigate]);

  useEffect(() => {
    const headerHeight = 185;
    const handleScroll = () => {
      for (const seccion of secciones) {
        const el = document.getElementById(seccion);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
          setSeccionActiva(seccion);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [secciones]);

  useEffect(() => {
    if (!data) return;
    const timeout = setTimeout(() => {
      const headerHeight = 185;
      for (const seccion of secciones) {
        const el = document.getElementById(seccion);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
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
    <>
      <Cabecera />
      <MenuSecciones 
        sections={secciones} 
        data={data} 
        activeSection={seccionActiva} 
      />

      <div className="bg-neutral-100 m-5 rounded-lg border-2 border-gray-300 shadow-lg">
        <div className="pt-[50px] px-8 md:px-35 bg-white-100 text-black space-y-8">
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
      <Pie />
    </>
  );
};

export default DetallePeliculaSerie;
