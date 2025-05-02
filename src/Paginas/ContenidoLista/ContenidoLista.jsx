import React, { useState, useEffect } from 'react';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import Lista from '../../Componentes/Lista/Lista';

const ContenidoLista = ({ tipo }) => {
  const API_KEY = 'f0bbdd09a3268c4fe8d469dc1db26b5c';
  const [contenido, setContenido] = useState([]);
  const [pagina, setPagina] = useState(1);

  const getContenido = async () => {
    try {
      const url = `https://api.themoviedb.org/3/discover/${tipo}?api_key=${API_KEY}&language=es&region=AR&sort_by=popularity.desc&page=${pagina}`;

      const res = await fetch(url);
      const data = await res.json();

      // Agregar media_type manualmente porque la API no lo devuelve
      const contenidoConTipo = data.results.map(item => ({
        ...item,
        media_type: tipo
      }));

      setContenido(prevContenido => {
        return pagina === 1 ? contenidoConTipo : [...prevContenido, ...contenidoConTipo];
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getContenido();
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
