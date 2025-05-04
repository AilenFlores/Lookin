import React, { useState, useEffect } from 'react';
import { getPlataformas } from '../../Servicios/apiTMDB';
import OrdenSelect from '../OrdenSelect/OrdenSelect';
import PlataformaFiltro from '../PlataformaFiltro/PlataformaFiltro';


const Filtros = ({ onFiltrar, tipo }) => {
  const [plataformas, setPlataforma] = useState([]);
  const [filtros, setFiltros] = useState({
    orden: 'popularity.desc',
    plataforma: null,
  });

  const ordenes = [
    { label: "Popularidad descendente", value: "popularity.desc" },
    { label: "Popularidad ascendente", value: "popularity.asc" },
    {
      label: "Fecha de estreno ascendente",
      value: tipo === "tv" ? "first_air_date.asc" : "release_date.asc",
    },
    {
      label: "Fecha de estreno descendente",
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

  useEffect(() => {
    onFiltrar(filtros);
  }, [filtros]);

  const handleOrdenChange = (value) => {
    setFiltros(prev => ({ ...prev, orden: value }));
  };

  const handlePlataformaChange = (id) => {
    setFiltros(prev => ({ ...prev, plataforma: id }));
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
