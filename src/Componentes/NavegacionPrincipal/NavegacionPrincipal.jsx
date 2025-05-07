import React from 'react';
import { FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Enlace from '../Enlace/Enlace';
import { ROUTES } from '../../const/routes';

const NavegacionPrincipal = ({ t, hamburguesaRef, setMenuAbierto }) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center space-x-4 sm:space-x-6">
            <Logo
                alt="Lookin Logo"
                width={150}
                className="w-28 sm:w-[150px] cursor-pointer"
                onClick={() => navigate(ROUTES.inicio)}
            />

            <nav className="hidden sm:flex space-x-4 items-center text-gray-700 text-sm sm:text-base font-medium">
                <Enlace to="/peliculas">{t("cabecera.peliculas")}</Enlace>
                <Enlace to="/series">{t("cabecera.series")}</Enlace>
            </nav>

            <button
                ref={hamburguesaRef}
                className="sm:hidden text-2xl text-gray-700 focus:outline-none"
                onClick={() => setMenuAbierto(prev => !prev)}
            >
            <FaBars />
            </button>
        </div>
    );
};

export default NavegacionPrincipal;