import React, { useState, useEffect } from 'react';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import Carrusel from '../../Componentes/Carrusel/Carrusel';
import Titulo from '../../Componentes/Titulo/Titulo';
import { getTendencias, getEstrenosEnCines } from '../../Servicios/apiTMDB';
import Cargando from '../../Componentes/Cargando/Cargando';


const Inicio = () => {
  const [tendencias, setTendencias] = useState([]);
  const [populares, setPopulares] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datosTendencias = await getTendencias();
        const datosEstrenos = await getEstrenosEnCines();
        setTendencias(datosTendencias);
        setPopulares(datosEstrenos);
        setIsLoading(false); 

      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setIsLoading(false); 

      }
    };

    fetchData();
  }, []);


  
if (isLoading) {
  return (
    <Cargando />
  );
}

  return (
    <div className="inicio">
      <Cabecera />
      <div className="relative mb-10">
        <Titulo 
          texto="TENDENCIAS: LO MÁS VISTO" 
          className="text-base text-red-600 sm:text-base md:text-2xl font-bold  absolute top-4 left-4 tracking-wider cursor-pointer"
        />
      </div>
      <Carrusel contenido={tendencias} tipo={"grande"} />
      <div className="relative mb-10">
        <Titulo 
          texto="ESTRENOS EN CINES: LO MÁS NUEVO" 
          className="text-base text-red-600 sm:text-base md:text-2xl font-bold  absolute top-4 left-4 tracking-wider cursor-pointer"
        />
      </div>
      <Carrusel contenido={populares} tipo={"grande"} />
      <Pie />
    </div>
  );
};

export default Inicio;
