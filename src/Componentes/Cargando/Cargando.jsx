import React from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Titulo from '../Titulo/Titulo'; 

const Cargando = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-center space-y-4">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-red-600" />
        <Titulo texto="Cargando..." className="text-xl font-semibold" />
        </div>
    );
    }

export default Cargando;