import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Lista from '../../Componentes/Lista/Lista';
import Cargando from '../../Componentes/Cargando/Cargando';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import { useTranslation } from 'react-i18next';
import { useTMDB } from '../../Servicios/hooks/useTMDB';

const ResultadosBusqueda = () => {
  const { t,i18n } = useTranslation("varios");
  const { buscarContenido } = useTMDB();
  const { termino } = useParams();
  const [resultados, setResultados] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(true);
  const idsVistos = new Set(); 

  useEffect(() => {
    setResultados([]);
    setPagina(1);
    setTotalPaginas(1);
    setCargando(true);
  }, [termino]);

  useEffect(() => {
    const obtenerResultados = async () => {
      setCargando(true);
      const { resultados: nuevos, total_pages } = await buscarContenido(termino, pagina,i18n.language);

      const soloPeliculasYSeries = nuevos.filter(
        item => item.media_type === 'movie' || item.media_type === 'tv'
      );

      const unicos = soloPeliculasYSeries.filter(item => {
        const clave = `${item.media_type}-${item.id}`;
        if (idsVistos.has(clave)) return false;
        idsVistos.add(clave);
        return true;
      });

      setResultados(prev => [...prev, ...unicos]);
      setTotalPaginas(total_pages);
      setCargando(false);
    };

    obtenerResultados();
  }, [termino, pagina,i18n.language]);

  const cargarMas = () => {
    if (pagina < totalPaginas) {
      setPagina(prev => prev + 1);
    }
  };

  return (
    <>
      <Cabecera />
      <div className="bg-gradient-to-b from-white via-purple-800 to-purple-800 min-h-screen p-5 md:p-10">
        {cargando && resultados.length === 0 ? (
          <Cargando />
        ) : (
          <Lista
            peliculas={resultados}
            texto={`${t('resultadoBusqueda.resultadosPara')}: "${decodeURIComponent(termino)}"`}
            cargarMas={pagina < totalPaginas ? cargarMas : null}
            mensajeCartel={resultados.length === 0 ? t("resultadoBusqueda.resultadoBusqueda") : ''}
          />
        )}
      </div>
      <Pie />
    </>
  );
};

export default ResultadosBusqueda;
