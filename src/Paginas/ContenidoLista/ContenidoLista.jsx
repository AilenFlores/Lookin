import React, { useState, useEffect } from 'react';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import Lista from '../../Componentes/Lista/Lista';
import Cargando from '../../Componentes/Cargando/Cargando';
import Filtro from '../../Componentes/Filtros/Filtros';
import { getContenido } from '../../Servicios/apiTMDB';

const ContenidoLista = ({ tipo }) => {
  const [contenido, setContenido] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [filtros, setFiltros] = useState({
    orden: 'popularity.desc',
    plataforma: null,
  });

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
    setFiltros(prev => ({
      ...prev,
      ...nuevosFiltros
    }));
    setPagina(1);
  };

  const cargarMas = () => {
    setPagina(prev => prev + 1);
  };

  const titulo = tipo === 'movie' ? 'Películas Populares' : 'Series Populares';

  if (isLoading && contenido.length === 0) {
    return <Cargando />;
  }

  return (
    <div className="inicio bg-neutral-100">
      <Cabecera />
      <div className="grid md:grid-cols-[250px_1fr] max-w-screen-xl w-full mx-auto py-3">
        <Filtro onFiltrar={manejarCambioFiltros} tipo={tipo} />
        <div className="overflow-hidden">
          <Lista
            texto={titulo}
            peliculas={contenido}
            cargarMas={cargarMas}
          />
        </div>
      </div>
      <Pie />
    </div>
  );
};

export default ContenidoLista;
