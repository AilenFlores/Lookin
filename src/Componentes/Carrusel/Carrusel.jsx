// Carrusel.jsx
import React, { useRef, useState, useEffect } from 'react';
import Style from './Carrusel.module.css'; 
import Flechas from '../Flechas/Flechas';
import Tarjeta from '../Tarjeta/Tarjeta';

const Carrusel = ({ contenido, tipo, mediaType }) => {
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
    const manejarRedimensionamiento = () => {
      if (carruselRef.current) {
        setMostrarBotones(carruselRef.current.scrollWidth > carruselRef.current.clientWidth); // Mostrar botones solo si el contenido es más ancho que el contenedor
      }
    };
    window.addEventListener('resize', manejarRedimensionamiento);
    // Ejecutar también al cargar
    manejarRedimensionamiento();
  
    return () => window.removeEventListener('resize', manejarRedimensionamiento);
  }, [contenido]);

  return (
    <div className="relative w-full flex justify-left p-5">
      <div className="w-fit overflow-hidden border-5 border-purple-500 rounded-lg shadow-lg">
        <div
          ref={carruselRef}
          className={`flex overflow-x-auto space-x-5  scroll-smooth snap-x snap-mandatory bg-neutral-100 m-2 rounded-lg ${Style.scrollOculta}`}
        >
          {contenido.map((item) => (
            <div key={item.id}>
              {/* le pasamos mediaType hacia Tarjeta */}
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
