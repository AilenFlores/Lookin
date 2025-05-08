import React from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Titulo from '../Titulo/Titulo'; 
import { useTranslation } from 'react-i18next';

const Cargando = ({ fullScreen = true }) => {
  const { t } = useTranslation("varios");
    return (
      <div className={`flex flex-col justify-center items-center text-center space-y-4 ${fullScreen ? 'min-h-screen' : 'h-full w-full'}`}>
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-purple-800" />
        <Titulo texto={t("cargando.cargando")} className="text-xl font-semibold" />
      </div>
    );
  };
  

export default Cargando;