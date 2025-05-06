import React, { useState, useRef, useEffect } from 'react';
import { FaBookmark, FaSearch, FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../const/routes';
import { useTranslation } from 'react-i18next';
import Boton from '../Boton/Boton';
import Enlace from '../Enlace/Enlace';
import ModalBuscador from '../ModalBuscador/ModalBuscador';
import Logo from '../Logo/Logo';

const Cabecera = () => {
  const navigate = useNavigate();
  const [mostrarBuscador, setMostrarBuscador] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const botonBusquedaRef = useRef(null);
  const menuRef = useRef(null);
  const hamburguesaRef = useRef(null);
  const { t, i18n } = useTranslation("cabecera");
  // const { t } = useTranslation("cabecera");
  const toggleIdioma = () => {
    const nuevoIdioma = i18n.language === "es" ? "en" : "es";
    console.log(i18n.language)
    i18n.changeLanguage(nuevoIdioma);
  };

  // Cierre automático del menú si se hace clic afuera
  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !hamburguesaRef.current.contains(e.target)
      ) {
        setMenuAbierto(false);
      }
    };

    if (menuAbierto) {
      document.addEventListener('mousedown', manejarClickFuera);
    }

    return () => {
      document.removeEventListener('mousedown', manejarClickFuera);
    };
  }, [menuAbierto]);

  
  return (
    <>
      <header className="sticky top-0 z-[9999] bg-white shadow px-4 w-full h-20 flex items-center">
        <div className="flex justify-between items-center w-full relative">
          {/* Izquierda: logo + hamburguesa */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Logo
              alt="Lookin Logo"
              width={150}
              className="w-28 sm:w-[150px] cursor-pointer"
              onClick={() => navigate(ROUTES.inicio)}
            />

            {/* Menú grande (visible desde sm+) */}
            <nav className="hidden sm:flex space-x-4 items-center text-gray-700 text-sm sm:text-base font-medium">
              <Enlace to="/peliculas">{t("cabecera.peliculas")}</Enlace>
              <Enlace to="/series">{t("cabecera.series")}</Enlace>
            </nav>

            {/* Ícono hamburguesa (solo mobile) */}
            <button
              ref={hamburguesaRef}
              className="sm:hidden text-2xl text-gray-700 focus:outline-none"
              onClick={() => setMenuAbierto(prev => !prev)}
            >
              <FaBars />
            </button>
          </div>

          {/* Derecha: Bookmark, EN y lupa */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <FaBookmark
              className="text-lg sm:text-2xl cursor-pointer m-0 hover:text-purple-800"
              title="Favoritos"
              onClick={() => navigate(ROUTES.favoritos)}
            />
            <Boton
        // texto="EN"
              texto={i18n.language === "es" ? "ES" : "EN"}
              className="!bg-white !text-black !border !border-black hover:!bg-purple-800 !px-2 !py-1 sm:!px-3 sm:!py-2 text-xs sm:text-sm"
              onClick={toggleIdioma}
              />
            <FaSearch
              ref={botonBusquedaRef}
              className="text-lg sm:text-4xl cursor-pointer hover:text-purple-800 rounded-full p-1"
              onClick={() => setMostrarBuscador(prev => !prev)}
            />
          </div>

          {/* Menú desplegable solo en mobile */}
          {menuAbierto && (
            <div
              ref={menuRef}
              className="fixed top-20 left-0 right-0 bg-white shadow-lg border-t border-gray-200 sm:hidden z-[9999]"
            >
              <nav className="flex flex-col px-4 py-3 space-y-3 text-gray-700 font-medium text-base">
                <Enlace to="/peliculas" onClick={() => setMenuAbierto(false)}>Películas</Enlace>
                <Enlace to="/series" onClick={() => setMenuAbierto(false)}>Series</Enlace>
              </nav>
            </div>
          )}
        </div>
      </header>

      <ModalBuscador
        visible={mostrarBuscador}
        onClose={() => setMostrarBuscador(false)}
        ignoreRef={botonBusquedaRef}
      />
    </>
  );
};

export default Cabecera;
