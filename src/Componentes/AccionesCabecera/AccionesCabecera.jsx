import React from 'react';
import { FaBookmark, FaSearch } from "react-icons/fa";
import Boton from '../Boton/Boton';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../const/routes';

const AccionesCabecera = ({ i18n, toggleIdioma, botonBusquedaRef, clickBuscador }) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center space-x-3 sm:space-x-4">
            <FaBookmark
                className="text-lg sm:text-2xl cursor-pointer m-0 hover:text-purple-800"
                title="Favoritos"
                onClick={() => navigate(ROUTES.favoritos)}
            />
            <Boton
                texto={i18n.language === "es" ? "ES" : "EN"}
                className="!bg-white !text-black !border !border-black hover:!bg-purple-800 !px-2 !py-1 sm:!px-3 sm:!py-2 text-xs sm:text-sm"
                onClick={toggleIdioma}
            />
            <FaSearch
                ref={botonBusquedaRef}
                className="text-lg sm:text-4xl cursor-pointer hover:text-purple-800 rounded-full p-1"
                onClick={clickBuscador}
            />
        </div>
    );
};

export default AccionesCabecera;