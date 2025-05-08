import React, { useState, useEffect } from 'react';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import Cargando from '../../Componentes/Cargando/Cargando';
import ListadoConFiltros from '../../Componentes/ListadoConFiltros/ListadoConFiltros';
import { useTranslation } from 'react-i18next';
import { useTMDB } from '../../Servicios/hooks/useTMDB';

const ContenidoLista = ({ tipo }) => {
  const [contenido, setContenido] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filtros, setFiltros] = useState({ orden: 'popularity.desc', plataforma: null });
  const { t, i18n } = useTranslation("catalogo");
  const { getContenido } = useTMDB();

  useEffect(() => {
    setContenido([]);
    setPagina(1);
    setIsLoading(true);
  }, [tipo]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const datos = await getContenido(tipo, pagina, filtros,i18n.language);
        setContenido(prev => (pagina === 1 ? datos : [...prev, ...datos]));
      } catch (err) {
        console.error('Error al cargar los datos:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [tipo, pagina, filtros,i18n.language]);

  const manejarCambioFiltros = (nuevosFiltros) => {
    if ('plataforma' in nuevosFiltros) {
      nuevosFiltros.plataforma !== null
      ? localStorage.setItem('plataforma_filtrada', String(nuevosFiltros.plataforma))
      : localStorage.removeItem('plataforma_filtrada');    
    }
    setFiltros(prev => ({ ...prev, ...nuevosFiltros }));
    setPagina(1);
  };

  const cargarMas = () => setPagina(prev => prev + 1);
  const titulo = tipo === 'movie' ? t('catalogo.tituloCatalogoPeliculas') : t('catalogo.tituloCatalogoSeries');

  if (isLoading && contenido.length === 0) return <Cargando />;
  return (
    <div className="inicio bg-gradient-to-b from-white via-purple-800 to-purple-800">
      <Cabecera />
      <ListadoConFiltros
        titulo={titulo}
        contenido={contenido}
        onFiltrar={manejarCambioFiltros}
        tipo={tipo}
        cargarMas={cargarMas}
      />
      <Pie />
    </div>
  );
};

export default ContenidoLista;
