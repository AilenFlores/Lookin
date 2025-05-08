import React from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../../Componentes/Boton/Boton';
import Cabecera from '../../Componentes/Cabecera/Cabecera'; 
import Pie from '../../Componentes/Pie/Pie';
import { useTranslation } from 'react-i18next';

const Pagina404 = () => {
  const { t } = useTranslation("varios");
  
  const navigate = useNavigate();

  return (
    <div className="inicio bg-gradient-to-b from-white via-purple-800 to-purple-800 min-h-screen ">
      <Cabecera />
        <div className="min-h-screen flex flex-col items-center justify-center bg-white rounded-lg border-2 border-gray-300 shadow-lg p-5 m-14">
            <img
                src="https://img.freepik.com/vector-gratis/ilustracion-concepto-alerta_114360-1551.jpg"
                alt="Ilustración de error 404"
                className="w-72 md:w-96 mb-6"
            />
            <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">{t("error404.mensaje1")}</h2>
            <p className="text-gray-600 mb-6">{t("error404.mensaje2")}</p>
            
            <div className="mt- flex justify-center">
              <Boton
                texto={t("error404.volver")}
                onClick={() => navigate('/')}
                className="w-full max-w-xs sm:w-64"
              />
            </div>

        </div>
      <Pie />
    </div>
  );
};

export default Pagina404;
