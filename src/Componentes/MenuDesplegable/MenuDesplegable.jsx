import React from 'react';
import Enlace from '../Enlace/Enlace';

const MenuDesplegable = ({ menuRef, setMenuAbierto, t }) => {
    return (
        <div
            ref={menuRef}
            className="fixed top-20 left-0 right-0 bg-white shadow-lg border-t border-gray-200 sm:hidden z-[9999]"
        >
            <nav className="flex flex-col px-4 py-3 space-y-3 text-gray-700 font-medium text-base">
                <Enlace to="/peliculas" onClick={() => setMenuAbierto(false)}>{t("cabecera.peliculas")}</Enlace>
                <Enlace to="/series" onClick={() => setMenuAbierto(false)}>{t("cabecera.series")}</Enlace>
            </nav>
        </div>
    );
};

export default MenuDesplegable;