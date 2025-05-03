import React from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../../Componentes/Boton/Boton';
import Cabecera from '../../Componentes/Cabecera/Cabecera'; 
import Pie from '../../Componentes/Pie/Pie';

const Pagina404 = () => {
  const navigate = useNavigate();

  return (
    <>
      <Cabecera />
      <div className="bg-neutral-100 m-5 rounded-lg border-2 border-gray-300 shadow-lg">
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4 py-10">
            <img
                src="https://img.freepik.com/vector-gratis/ilustracion-concepto-alerta_114360-1551.jpg"
                alt="Ilustración de error 404"
                className="w-72 md:w-96 mb-6"
            />
            <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Página no encontrada</h2>
            <p className="text-gray-600 mb-6">Lo sentimos, no pudimos encontrar lo que estás buscando.</p>
            <Boton texto="Volver al inicio" onClick={() => navigate('/')} className="bg-black hover:bg-red-600" />
        </div>
      </div>
      <Pie />
    </>
  );
};

export default Pagina404;
