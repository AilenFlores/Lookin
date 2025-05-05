import React, { useEffect, useState } from 'react';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import Lista from '../../Componentes/Lista/Lista';

const Favoritos = () => {
  const [peliculas, setPeliculas] = useState([]);
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
  
  return (
    <div>
    <Cabecera /> 
    <div className="bg-gradient-to-b from-white via-purple-800 to-purple-800 min-h-screen p-5 md:p-10">
    <Lista
  texto="Películas y series Favoritas"
  peliculas={peliculas}
  mensajeCartel={ <>
      Aún no tienes favoritos guardados.<br />
      Explorá películas y series y agregalas a tu lista para verlas más tarde.
    </>
  }/>   
    </div> 
    <Pie />
  </div>
  );
};

export default Favoritos;
