import React, { useState, useEffect } from 'react';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import Pie from '../../Componentes/Pie/Pie';
import Carrusel from '../../Componentes/Carrusel/Carrusel';
import Titulo from '../../Componentes/Titulo/Titulo';
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
  }, [i18n.language]);

  if (isLoading) return <Cargando />;

  return (
    <div className="inicio bg-gradient-to-b from-white via-purple-800 to-purple-800 min-h-screen ">
      <Cabecera />
      <Logo
        alt="Logo de Lookin"
        width={800}
        className="mx-auto my-0 mb-4 mt-20"
      />
      <Titulo texto={t("inicio.slogan")} className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight mb-20 mt-8" />
      <div className="md:mx-10 mx-5 bg-white rounded-lg border-2 border-gray-300 shadow-lg p-5 md:p-10 mt-10 mb-10">
        <div className="relative">
          <Titulo texto={t("inicio.tendencias")}
          className="text-3xl md:text-4xl font-extrabold text-white bg-gradient-to-r from-purple-800 via-black to-purple-800 px-6 py-4 rounded-lg text-center tracking-wide uppercase mb-1 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          />
        </div>
        <Carrusel contenido={tendencias} tipo={"grande"} />
        <div className="relative">
          <Titulo 
          texto={t("inicio.estrenos")}
          className="text-3xl md:text-4xl font-extrabold text-white bg-gradient-to-r from-purple-800 via-black to-purple-800 px-6 py-4 rounded-lg text-center tracking-wide uppercase mb-1 shadow-[0_0_20px_rgba(0,0,0,0.8)] mt-10"
          />
        </div>
        <Carrusel contenido={populares} tipo={"grande"} />
      </div>
      <Pie />
    </div>
  );
};

export default Inicio;
