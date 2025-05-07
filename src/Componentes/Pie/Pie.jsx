import React from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../const/routes';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo'; 

const Pie = () => {
  const { t } = useTranslation("pie");
  const navigate = useNavigate();
  return (
    <footer className="bg-black text-white py-8 mt-0 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start text-center md:text-left">
          <Logo
            alt="Lookin Logo"
            width={150}
            className="mr-4"      
            onClick={() => navigate(ROUTES.inicio)}
          />
          <Subtitulo texto={t("pie.descripcionCorta")} className="text-gray-400 mb-3 mt-5" />
          <Subtitulo texto={t("pie.descripcionLarga1")} className="text-gray-500 mb-3" />
          <Subtitulo texto={t("pie.descripcionLarga2")} className="text-gray-500 mb-6" />
          <Subtitulo texto={t("pie.disclaimer")} className="text-gray-400 text-xs" />
        </div>
        <div className="mt-8 flex justify-center items-center">
          <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="TMDb Logo" className="w-42 h-auto" />
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-xs text-gray-400">
        <Subtitulo texto={t("pie.avisoLegal")} className="mb-2 text-gray-500" />     
      </div>
    </footer>
  );
};

export default Pie;
