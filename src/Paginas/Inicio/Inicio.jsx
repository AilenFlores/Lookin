import React, { useState, useEffect } from 'react';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import Carrusel from '../../Componentes/Carrusel/Carrusel';
import Titulo from '../../Componentes/Titulo/Titulo';

const Inicio = () => {
  const API_KEY = 'f0bbdd09a3268c4fe8d469dc1db26b5c';

  const [tendencias, setTendencias] = useState([]);
  const [populares, setPopulares] = useState([]);

  const getTendencias = async () => {
    try {
      const url = `https://api.themoviedb.org/3/trending/all/day?&language=es&api_key=${API_KEY}`;
      const res = await fetch(url); 
      const data = await res.json(); 
      setTendencias(data.results)
    } catch (err) {
      console.error(err);
    }
  };

  const getEstrenosEnCines = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&region=AR&language=es&page=1`;
      const res = await fetch(url);
      const data = await res.json();
      const resultadosConTipo = data.results.map(pelicula => ({
        ...pelicula,
        media_type: 'movie'
      }));
  
      setPopulares(resultadosConTipo);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    getTendencias();
    getEstrenosEnCines();
  }, []); 
  
  return (
    <div className="inicio">
      <Cabecera />

      <div className="relative mb-10">
      <Titulo 
      texto="TENDENCIAS: LO MÁS VISTO" 
      className="text-2xl text-red-600 font-bold text-black absolute top-4 left-4 tracking-wider cursor-pointer"/>
      </div>
      <Carrusel contenido={tendencias} tipo={"grande"} />

      <div className="relative mb-10">
      <Titulo 
      texto="ESTRENOS EN CINES: LO MÁS NUEVO" 
      className="text-2xl text-red-600 font-bold text-black absolute top-4 left-4 tracking-wider cursor-pointer"
      />
      </div>
        <Carrusel contenido={populares} tipo={"grande"} />
      
      <Pie />
    </div>
  );
};

export default Inicio;


