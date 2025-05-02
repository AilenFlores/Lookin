import React, { useState, useEffect } from 'react';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import Lista from '../../Componentes/Lista/Lista';
import { getContenido } from '../../Servicios/apiTMDB';

const ContenidoLista = ({ tipo }) => {

  const [contenido, setContenido] = useState([]);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    setContenido([]);     
    setPagina(1);      
  }, [tipo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datosContenido = await getContenido(tipo, pagina);
        setContenido(prev =>
          pagina === 1 ? datosContenido : [...prev, ...datosContenido]
        );
      } catch (err) {
        console.error('Error al cargar los datos:', err);
      }
    };
  
    fetchData();
  }, [pagina, tipo]);
  
  
  const cargarMas = () => {
    setPagina(prev => prev + 1);
  };

  const titulo = tipo === 'movie' ? 'Películas Populares' : 'Series Populares';

  return (
    <div className="inicio">
      <Cabecera />
      <Lista texto={titulo} peliculas={contenido} cargarMas={cargarMas} />
      <Pie />
    </div>
  );
};

export default ContenidoLista;
