import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Subtitulo from '../../Componentes/Subtitulo/Subtitulo';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import GuardarFavorito from '../../Componentes/GuardarFavorito/GuardarFavorito';
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
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [activeSection, setActiveSection] = useState('sinopsis');
  const sections = ['sinopsis', 'info', 'galeria', 'reparto', 'trailer', 'ver', 'similares'];
  if (tipo === 'tv') sections.splice(6, 0, 'temporadas');

  useEffect(() => {
    const obtenerDatos = async () => {
      const resultado = await getDetallePorId(id, tipo);
      if (resultado) {
        setData(resultado);
        setError(false);
      } else {
        setError(true);
      }
    };
    obtenerDatos();
  }, [id, tipo]);

  useEffect(() => {
    const headerHeight = 185;
    const handleScroll = () => {
      for (const section of sections) {
        const el = document.getElementById(section);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);
  
  if (error) return <div className="text-white p-5">Error al cargar los datos.</div>;
  if (!data) return <Cargando />;

  return (
    <>
      <Cabecera />

      <MenuSecciones 
        sections={sections} 
        data={data} 
        activeSection={activeSection} />

      <div className="bg-neutral-100 m-5 rounded-lg border-2 border-gray-300 shadow-lg"> 
          
        <div className="pt-[50px] px-8 md:px-35 bg-white-100 text-black space-y-8">
          {/* Sinopsis */}
          <SeccionSinopsis data={data} />

          {/* Información */}
          <SeccionInformacion data={data} />

          {/* Galería de imágenes (solo si hay imágenes) */}
          <SeccionGaleriaImagenes posters={data.images?.posters} backdrops={data.images?.backdrops} />

          {/* Reparto (solo si hay cast) */}
          <SeccionReparto reparto={data.credits?.cast} />

          {/* Trailer (solo si hay al menos un video) */}
          {data.videos?.results?.length > 0 && (
            <SeccionTrailer videoKey={data.videos.results[0].key} />
          )}

          {/* ¿Dónde verla? (solo si hay ofertas) */}
          <SeccionDondeVerla data={data} />

          {/* Temporadas (solo si es una serie y hay temporadas) */}
          {tipo === 'tv' && <SeccionTemporadas data={data} id={id} />}

          {/* Similares (sigue igual) */}
          <SeccionSimilares data={data} tipo={tipo} />

        </div>
      </div>
      <Pie/>
    </>
  );
};

export default DetallePeliculaSerie;