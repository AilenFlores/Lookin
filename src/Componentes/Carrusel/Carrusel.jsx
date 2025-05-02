import React, { useRef, useState, useEffect } from 'react';
import Style from './Carrusel.module.css'; 
import Flechas from '../Flechas/Flechas';
import Tarjeta from '../Tarjeta/Tarjeta';

const Carrusel = ({ contenido, tipo }) => {
  const carruselRef = useRef(null);
  const [mostrarBotones, setMostrarBotones] = useState(false);
  const size = tipo === 'grande' ? 20 : 10;

  const Desplazar = (direccion) => {
    const cantidadDesplazamiento = 300;
    if (carruselRef.current) {
      carruselRef.current.scrollBy({
        left: direccion === 'derecha' ? cantidadDesplazamiento : -cantidadDesplazamiento,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const carrusel = carruselRef.current;
    if (carrusel && carrusel.scrollWidth > carrusel.clientWidth) {
      setMostrarBotones(true);
    }
  }, [contenido]);

  return (
    <div className="relative w-full flex justify-center p-5">
      <div className="w-full overflow-hidden border-2 border-gray-300 rounded-lg shadow-lg">
        <div
          ref={carruselRef}
          className={`flex overflow-x-auto space-x-5 p-4 scroll-smooth snap-x snap-mandatory bg-gray-300 m-2 rounded-lg ${Style.scrollOculta}`}
        >
          {contenido.map((item) => (
            <div key={`${item.id}`}>
              <Tarjeta contenido={item} tipo={tipo} />
            </div>
          ))}
        </div>

        {mostrarBotones && (
          <Flechas Desplazar={Desplazar} size={size} />
        )}
      </div>
    </div>
  );
};

export default Carrusel;
