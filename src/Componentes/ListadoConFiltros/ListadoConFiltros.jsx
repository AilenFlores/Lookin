// ListadoConFiltros.jsx
import React from 'react';
import Lista from '../../Componentes/Lista/Lista';
import Filtro from '../../Componentes/Filtros/Filtros';

const ListadoConFiltros = ({ titulo, contenido, onFiltrar, tipo, cargarMas }) => {
  return (
   <div className="grid md:grid-cols-[250px_1fr] gap-8 max-w-screen-xl w-full mx-auto py-3 mt-8">
  <Filtro onFiltrar={onFiltrar} tipo={tipo} />
  <div className="w-full  overflow-hidden"> 
  <Lista
    texto={titulo}
    peliculas={contenido}
    cargarMas={cargarMas}
    mensajeCartel="No se encontraron resultados"
  />
</div>

</div>

  );
};

export default ListadoConFiltros;
