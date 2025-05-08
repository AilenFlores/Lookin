import React, { useRef, useState, useEffect } from 'react';
import Style from './Carrusel.module.css'; 
import Flechas from '../Flechas/Flechas';
import Tarjeta from '../Tarjeta/Tarjeta';

const Carrusel = ({ contenido, tipo, mediaType }) => {
  const carruselRef = useRef(null);
  const [mostrarBotones, setMostrarBotones] = useState(false);
  const size = tipo === 'grande' ? 20 : 10;

  const Desplazar = (direccion) => {
    const cantidadDesplazamiento = 240;
    if (carruselRef.current) {
      carruselRef.current.scrollBy({
        left: direccion === 'derecha' ? cantidadDesplazamiento : -cantidadDesplazamiento,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const manejarRedimensionamiento = () => {
      if (carruselRef.current) {
        setMostrarBotones(carruselRef.current.scrollWidth > carruselRef.current.clientWidth); 
      }
    };
    window.addEventListener('resize', manejarRedimensionamiento);
    manejarRedimensionamiento();
  
    return () => window.removeEventListener('resize', manejarRedimensionamiento);
  }, [contenido]);

  return (
    <div className="relative w-full flex justify-left  ">
    <div className="w-fit overflow-hidden border-2 m-5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] bg-purple-100 rounded-lg  border-purple-300"> 
        <div ref={carruselRef}
          className={`flex overflow-x-auto space-x-5  scroll-smooth snap-x snap-mandatoryb bg-purple-300 m-3 p-2 rounded-lg ${Style.scrollOculta}`}
        >
          {contenido.map((item) => (
            <div key={item.id}>
              <Tarjeta contenido={item} tipo={tipo} mediaType={mediaType} />
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
