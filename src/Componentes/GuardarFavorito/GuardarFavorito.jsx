import React, { useState, useEffect } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';  // Importamos iconos de react-icons

const GuardarFavorito = ({ pelicula }) => {
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const peliculaGuardada = favoritos.some(fav => fav.id === pelicula.id); 
    setFavorito(peliculaGuardada); 
  }, [pelicula.id]); 

  const favoritoClick = (e) => {
    e.stopPropagation(); // Evitar que se dispare el click del contenedor

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos = favorito ? favoritos.filter(fav => fav.id !== pelicula.id) : [...favoritos, pelicula];
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    setFavorito(!favorito);
  };

  return (
    <button onClick={favoritoClick}>
      {favorito ? ( <FaBookmark size={30} className="text-yellow-400" /> ) : (<FaRegBookmark size={30} className="text-white hover:text-yellow-400" />)}
    </button>
  );
};

export default GuardarFavorito;
