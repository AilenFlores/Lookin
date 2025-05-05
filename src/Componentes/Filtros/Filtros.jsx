import React, { useState, useEffect } from 'react';
import { getPlataformas } from '../../Servicios/apiTMDB';
import OrdenSelect from '../OrdenSelect/OrdenSelect';
import PlataformaFiltro from '../PlataformaFiltro/PlataformaFiltro';
import { useTranslation } from 'react-i18next';


const Filtros = ({ onFiltrar, tipo }) => {
  const { t } = useTranslation("catalogo");
  const [plataformas, setPlataforma] = useState([]);
  const [filtros, setFiltros] = useState(() => {
  const plataformaGuardada = localStorage.getItem('plataforma_filtrada');
 
    return {
      orden: 'popularity.desc',
      plataforma: plataformaGuardada ? Number(plataformaGuardada) : null,
    };
  });
  

  const ordenes = [
    { label: t('ordenamiento.popularidadDesc'), value: "popularity.desc" },
    { label: t("ordenamiento.popularidadAsc"), value: "popularity.asc" },
    {
      label: t("ordenamiento.fechaEstrenoAsc"),
      value: tipo === "tv" ? "first_air_date.asc" : "release_date.asc",
    },
    {
      label: t("ordenamiento.fechaEstrenoDesc"),
      value: tipo === "tv" ? "first_air_date.desc" : "release_date.desc",
    },
  ];

  useEffect(() => {
    const cargarPlataformas = async () => {
      const data = await getPlataformas(tipo);
      setPlataforma(data);
    };
    cargarPlataformas();
  }, [tipo]);

  const handleOrdenChange = (value) => {
    const nuevosFiltros = { ...filtros, orden: value };
    setFiltros(nuevosFiltros); 
    onFiltrar(nuevosFiltros); // ✅ llamar explícitamente 
  };
  
  const handlePlataformaChange = (id) => {
    const nuevosFiltros = { ...filtros, plataforma: id };
    setFiltros(nuevosFiltros);
    onFiltrar(nuevosFiltros); // ✅ llamar explícitamente
  };
  
  return (
    <div className="w-[90%] max-w-xs md:w-68 bg-white shadow-md rounded-lg p-4 text-sm space-y-6 border-2 border-gray-300 max-h-fit mt-2 mx-auto md:mx-0">
      <OrdenSelect
        ordenes={ordenes}
        valorSeleccionado={filtros.orden}
        onChange={handleOrdenChange}
      />
      <PlataformaFiltro
        plataformas={plataformas}
        seleccionada={filtros.plataforma}
        onSeleccionar={handlePlataformaChange}
      />
    </div>
  );
};

export default Filtros;
