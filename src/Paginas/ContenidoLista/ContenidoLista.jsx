// ContenidoLista.jsx
import React, { useState, useEffect } from 'react';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import Cargando from '../../Componentes/Cargando/Cargando';
import ListadoConFiltros from '../../Componentes/ListadoConFiltros/ListadoConFiltros';
import { getContenido } from '../../Servicios/apiTMDB';

const ContenidoLista = ({ tipo }) => {
  const [contenido, setContenido] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filtros, setFiltros] = useState({ orden: 'popularity.desc', plataforma: null });

  useEffect(() => {
    setContenido([]);
    setPagina(1);
    setIsLoading(true);
  }, [tipo]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const datos = await getContenido(tipo, pagina, filtros);
        setContenido(prev => (pagina === 1 ? datos : [...prev, ...datos]));
      } catch (err) {
        console.error('Error al cargar los datos:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [tipo, pagina, filtros]);

  const manejarCambioFiltros = (nuevosFiltros) => {
    if ('plataforma' in nuevosFiltros) {
      if (nuevosFiltros.plataforma !== null) {
        localStorage.setItem('plataforma_filtrada', String(nuevosFiltros.plataforma));
      } else {
        localStorage.removeItem('plataforma_filtrada');
      }
    }
    
    
    

    setFiltros(prev => ({ ...prev, ...nuevosFiltros }));
    setPagina(1);
  };

  const cargarMas = () => setPagina(prev => prev + 1);
  const titulo = tipo === 'movie' ? 'CATÁLOGO COMPLETO DE PELICULAS' : 'CATÁLOGO COMPLETO DE SERIES';

  if (isLoading && contenido.length === 0) return <Cargando />;

  return (
    <div className="inicio bg-neutral-100">
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
