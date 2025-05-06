import React, { useState, useEffect } from 'react';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import Carrusel from '../../Componentes/Carrusel/Carrusel';
import Titulo from '../../Componentes/Titulo/Titulo';
// import { getTendencias, getEstrenosEnCines } from '../../Servicios/apiTMDB';
import Cargando from '../../Componentes/Cargando/Cargando';
import Logo from '../../Componentes/Logo/Logo'; 
import { useTranslation } from 'react-i18next';
import { useTMDB } from '../../Servicios/hooks/useTMDB';

const Inicio = () => {
  const [tendencias, setTendencias] = useState([]);
  const [populares, setPopulares] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation("inicio");
  const { getTendencias, getEstrenosEnCines } = useTMDB();
  const logo = Logo; // Asegúrate de que la ruta sea correcta

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datosTendencias = await getTendencias(i18n.language);
        const datosEstrenos = await getEstrenosEnCines(i18n.language);
        setTendencias(datosTendencias);
        setPopulares(datosEstrenos);
        setIsLoading(false); 

      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setIsLoading(false); 

      }
    };

    fetchData();
  }, [getTendencias, getEstrenosEnCines,i18n.language]);


  
if (isLoading) {
  return (
    <Cargando />
  );
}

  return (
    <div className="inicio bg-gradient-to-b from-white via-purple-800 to-purple-800 min-h-screen ">
      <Cabecera />
      {/* 🟣 Logo + Slogan */}
      
      <Logo
        alt="Logo de Lookin"
        width={800}
        className="mx-auto my-0 mb-4 mt-20"
      />

        <h1 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight mb-20 mt-8">
          {t("inicio.slogan")}
        </h1>
      

      <div className="md:mx-14 mx-5 bg-white rounded-lg border-2 border-gray-300 shadow-lg p-5 md:p-10 mt-10 mb-10">
        <div className="relative mb-10">
          <Titulo 
            // texto="TENDENCIAS: LO MÁS VISTO"
          texto={t("inicio.tendencias")}
            className="text-base text-black sm:text-base md:text-2xl font-bold absolute top-4 left-4 "
          />
        </div>
        <Carrusel contenido={tendencias} tipo={"grande"} />
        <div className="relative mb-10">
          <Titulo 
            // texto="ESTRENOS EN CINES: LO MÁS NUEVO"
          texto={t("inicio.estrenos")}
            className="text-base text-black sm:text-base md:text-2xl font-bold  absolute top-4 left-4"
          />
        </div>
        <Carrusel contenido={populares} tipo={"grande"} />
      </div>
      <Pie />
    </div>
  );
};

export default Inicio;
