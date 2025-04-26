import React from 'react';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
const Inicio = () => {
    return (
        <div className="inicio">
           <Cabecera />
           <div className="p-4 m-4 mx-2 relative h-dvh border-blue-500 md:border-green-500 border-4 ">
           </div>
           <Pie />
        </div>
    );
}
export default Inicio;