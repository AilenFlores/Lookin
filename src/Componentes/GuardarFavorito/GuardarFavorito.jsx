import React, { useState, useEffect } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import Swal from 'sweetalert2';
import MensajeEmergente from '../MensajeEmergente/MensajeEmergente'; 
import { useTranslation } from 'react-i18next';

const GuardarFavorito = ({ pelicula }) => {
    const { t } = useTranslation("alerta");
  
  const [favorito, setFavorito] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const peliculaGuardada = favoritos.some(fav => fav.id === pelicula.id); 
    setFavorito(peliculaGuardada); 
  }, [pelicula.id]); 

  const favoritoClick = (e) => {
    e.stopPropagation(); 

    if (favorito) {
      Swal.fire({
        title: t("alertaConfirmacion.titulo"),
        text: t("alertaConfirmacion.texto"),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: t("alertaConfirmacion.botonConfirmar"),
        cancelButtonText: t("alertaConfirmacion.botonCancelar"),
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
    setMostrarMensaje(true); 
  };

  return (
    <>
      <button onClick={favoritoClick}>
        {favorito ? (
          <FaBookmark size={30} className="text-yellow-400" />
        ) : (
          <FaRegBookmark size={30} className="text-white hover:text-yellow-400" />
        )}
      </button>
      {mostrarMensaje && (
        <MensajeEmergente
          mensaje={t("alertaConfirmacion.mensajeGuardado")}
          duracion={3000}
          onClose={() => setMostrarMensaje(false)}
        />
      )}
    </>
  );
};

export default GuardarFavorito;
