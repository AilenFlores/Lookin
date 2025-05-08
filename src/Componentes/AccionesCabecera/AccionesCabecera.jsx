import React from 'react';
import { FaBookmark, FaSearch } from "react-icons/fa";
import Boton from '../Boton/Boton';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../const/routes';

const AccionesCabecera = ({ i18n, toggleIdioma, botonBusquedaRef, clickBuscador }) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center gap-3 sm:gap-4">
            <FaBookmark
                className="text-xl sm:text-2xl cursor-pointer hover:text-purple-800 transition-transform duration-300 hover:scale-110"
                title="Favoritos"
                onClick={() => navigate(ROUTES.favoritos)}
            />
            
            <Boton
            onClick={toggleIdioma}
            texto={
            <span className="flex items-center">
                <img
                src={i18n.language === "es"
                    ? "https://flagcdn.com/ar.svg"
                    : "https://flagcdn.com/us.svg"}
                    alt="flag"
                    className="w-5 h-5 rounded-full object-cover mr-2"
                />{i18n.language === "es" ? "ES" : "EN"}
            </span>}
            className="bg-purple-800 text-white rounded-full !px-5 py-1 text-sm font-semibold shadow hover:scale-105 transition-transform duration-300 cursor-pointer"
            />

            <FaSearch
                ref={botonBusquedaRef}
                className="text-xl sm:text-3xl cursor-pointer hover:text-purple-800 rounded-full p-1 transition-transform duration-300 hover:scale-110"
                onClick={clickBuscador}
            />
        </div>
    );
};

export default AccionesCabecera;