import React, { useEffect, useState } from 'react';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import Lista from '../../Componentes/Lista/Lista';
import { useTranslation } from 'react-i18next';

const Favoritos = () => {
      const { t } = useTranslation("favoritos");
  
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
  texto={t("favoritos.titulo")}
  peliculas={peliculas}
  mensajeCartel={ <>
      {t("favoritos.mensajeCartel1")}<br />
      {t("favoritos.mensajeCartel2")}
    </>
  }/>   
    </div> 
    <Pie />
  </div>
  );
};

export default Favoritos;
