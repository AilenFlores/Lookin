import React, { useEffect, useState } from 'react';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import Lista from '../../Componentes/Lista/Lista';

const Favoritos = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [visibles, setVisibles] = useState(20); 

  useEffect(() => {
    const cargarFavoritos = () => {
      const favs = localStorage.getItem('favoritos');
      if (favs) {
        try {
          const favArray = JSON.parse(favs); 
          setPeliculas(favArray);
        } catch (e) {
          console.error("Error al parsear favoritos:", e);
        }
      } else {
        setPeliculas([]);
      }
    };
  
    cargarFavoritos();
  
    const handleUpdate = () => {
      cargarFavoritos();
    };
    window.addEventListener('favoritosActualizados', handleUpdate);
  
    return () => {
      window.removeEventListener('favoritosActualizados', handleUpdate);
    };
  }, []);

  const cargarMas = () => setVisibles(prev => prev + 6);

  return (
    <div>
      <Cabecera /> 
      <div className="bg-gradient-to-b from-white via-purple-800 to-purple-800 min-h-screen p-5 md:p-10">
        <Lista
          texto="Películas y series Favoritas"
          peliculas={peliculas.slice(0, visibles)}
          mensajeCartel={
            <>
              Aún no tienes favoritos guardados.<br />
              Explorá películas o series y agregalas a tu lista para verlas más tarde.
            </>
          }
          cargarMas={peliculas.length > visibles ? cargarMas : null} 
        />
      </div> 
      <Pie />
    </div>
  );
};

export default Favoritos;