import React, { useState, useEffect } from 'react';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import Lista from '../../Componentes/Lista/Lista';
import Cargando from '../../Componentes/Cargando/Cargando';
import { getContenido } from '../../Servicios/apiTMDB';
 

const ContenidoLista = ({ tipo }) => {

  const [contenido, setContenido] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  
  useEffect(() => {
    setContenido([]);     
    setPagina(1);    
    setIsLoading(true); 
  }, [tipo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datosContenido = await getContenido(tipo, pagina);
        setContenido(prev =>
          pagina === 1 ? datosContenido : [...prev, ...datosContenido]
        );
        setIsLoading(false); 

      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setIsLoading(false); 
      }
    };
  
    fetchData();
  }, [pagina, tipo]);

  const cargarMas = () => {
    setPagina(prev => prev + 1);
  };

  const titulo = tipo === 'movie' ? 'Películas Populares' : 'Series Populares';


if (isLoading) {
  return (
    <Cargando />
  );
}


  return (
    <div className="inicio">
      <Cabecera />
      <Lista texto={titulo} peliculas={contenido} cargarMas={cargarMas} />
      <Pie />
    </div>
  );
};

export default ContenidoLista;
