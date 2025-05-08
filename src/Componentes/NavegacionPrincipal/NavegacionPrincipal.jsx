import React from 'react';
import { FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Enlace from '../Enlace/Enlace';
import { ROUTES } from '../../const/routes';
import Boton from '../Boton/Boton';

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

            <Boton
            ref={hamburguesaRef}
            texto={<FaBars />}
            onClick={() => setMenuAbierto(prev => !prev)}
            className="sm:hidden text-2xl !m-0 !px-0 !text-gray-700 focus:outline-none bg-transparent shadow-none hover:text-purple-700"
            />
        </div>
    );
};

export default NavegacionPrincipal;