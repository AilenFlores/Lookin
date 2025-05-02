import React, { useEffect, useState } from 'react';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import Lista from '../../Componentes/Lista/Lista';

const Favoritos = () => {
  const [peliculas, setPeliculas] = useState([]);
  console.log(peliculas.length)
  useEffect(() => {
    const favs = localStorage.getItem('favoritos');
    if (favs) {
      try {
        const favArray = JSON.parse(favs); 
        setPeliculas(favArray);
      } catch (e) {
        console.error("Error al parsear favoritos:", e);
      }
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
    <Cabecera /> 
    <main className="flex-grow">
      {peliculas.length === 0 ? (
        <div className="max-w-xl mx-auto mt-16 p-6 bg-yellow-100 border border-yellow-300 rounded-xl shadow text-yellow-800 text-center text-lg font-medium">
          Por el momento no tenés películas ni series guardadas en favoritos.
        </div>
      ) : (
        <Lista texto="Películas y series Favoritas" peliculas={peliculas} />
      )}
    </main>
  
    <Pie />
  </div>
  );
};

export default Favoritos;
