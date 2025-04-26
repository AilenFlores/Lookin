import React from 'react';

const Cabecera = () => {
  return (
    <div className="relative w-full h-32 border-blue-500 md:border-green-500 border-4">
      <div className="text-red-500 p-4">
        <a href="#home">LOGO/Inicio</a>      
      </div>
      <div className="absolute bottom-0 left-0 p-4">
        <input type="text" placeholder="Buscar..." className="border-2 rounded-xl px-2 py-1"/>  
      </div>
    </div>
  );
};

export default Cabecera;
