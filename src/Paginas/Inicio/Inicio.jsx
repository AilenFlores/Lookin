import React, { useState, useEffect } from 'react';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import Lista from '../../Componentes/Lista/Lista';

const Inicio = () => {
  const API_KEY = 'f0bbdd09a3268c4fe8d469dc1db26b5c';

  const [peliculas, setPeliculas] = useState([]);
  const [pagina, setPagina] = useState(1);

  const cargarPeliculas = () => {
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${pagina}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPeliculas(prevPeliculas => {
     // (carga inicial)
          if (pagina === 1) {
            return data.results;
          } else {
            return [...prevPeliculas, ...data.results];
          }
        });
      })
      .catch(err => console.error(err))
  };

  useEffect(() => {
    cargarPeliculas();
  }, [pagina]); 

  const cargarMas = () => {
      setPagina(prevPagina => prevPagina + 1);  
  };

  return (
    <div className="inicio">
      <Cabecera />
      <Lista peliculas={peliculas} cargarMas={cargarMas} />
      <Pie />
    </div>
  );
};

export default Inicio;

