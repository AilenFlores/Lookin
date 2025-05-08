import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ModalBuscador from '../ModalBuscador/ModalBuscador';
import AccionesCabecera from '../AccionesCabecera/AccionesCabecera';
import NavegacionPrincipal from '../NavegacionPrincipal/NavegacionPrincipal';
import MenuDesplegable from '../MenuDesplegable/MenuDesplegable';

const Cabecera = () => {
  const [mostrarBuscador, setMostrarBuscador] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const botonBusquedaRef = useRef(null);
  const menuRef = useRef(null);
  const hamburguesaRef = useRef(null);
  const { t, i18n } = useTranslation("cabecera");
  const toggleIdioma = () => {
    const nuevoIdioma = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(nuevoIdioma);
  };

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
          <NavegacionPrincipal
            t={t}
            hamburguesaRef={hamburguesaRef}
            setMenuAbierto={setMenuAbierto}
          />
          <AccionesCabecera
            i18n={i18n}
            toggleIdioma={toggleIdioma}
            botonBusquedaRef={botonBusquedaRef}
            clickBuscador={() => setMostrarBuscador(prev => !prev)}
          />
          {menuAbierto && (
            <MenuDesplegable
              menuRef={menuRef}
              setMenuAbierto={setMenuAbierto}
              t={t}
            />
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