import React, { useState, useEffect } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import Swal from 'sweetalert2';

const GuardarFavorito = ({ pelicula }) => {
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const peliculaGuardada = favoritos.some(fav => fav.id === pelicula.id); 
    setFavorito(peliculaGuardada); 
  }, [pelicula.id]); 

  const favoritoClick = (e) => {
    e.stopPropagation(); // Evitar que se dispare el click del contenedor

    if (favorito) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta película se eliminará de tus favoritos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          eliminarFavorito();
        }
      });
    } else {
      agregarFavorito();
    }
  };
  const notificarCambioFavoritos = () => {
    const evento = new Event('favoritosActualizados');
    window.dispatchEvent(evento);
  };
  
  const eliminarFavorito = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const nuevosFavoritos = favoritos.filter(fav => fav.id !== pelicula.id);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    setFavorito(false);
    notificarCambioFavoritos(); 
  };
  
  const agregarFavorito = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const nuevosFavoritos = [...favoritos, pelicula];
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    setFavorito(true);
    notificarCambioFavoritos();
  };
  

  return (
    <button onClick={favoritoClick}>
      {favorito ? (
        <FaBookmark size={30} className="text-yellow-400" />
      ) : (
        <FaRegBookmark size={30} className="text-white hover:text-yellow-400" />
      )}
    </button>
  );
};

export default GuardarFavorito;
