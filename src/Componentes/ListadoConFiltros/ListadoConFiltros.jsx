import React from 'react';
import Lista from '../../Componentes/Lista/Lista';
import Filtro from '../../Componentes/Filtros/Filtros';
import { useTranslation } from 'react-i18next';

const ListadoConFiltros = ({ titulo, contenido, onFiltrar, tipo, cargarMas }) => {
    const { t } = useTranslation("varios");
  
  return (
<div className="mb-10 grid md:grid-cols-[235px_1fr] md:gap-5 mx-5 md:mx-10 md:mt-10 ">
  <Filtro onFiltrar={onFiltrar} tipo={tipo} />
  <div className="w-full overflow-hidden">
    <Lista
      texto={titulo}
      peliculas={contenido}
      cargarMas={cargarMas}
      mensajeCartel={t("listaFiltros.mensaje")}
    />
  </div>
</div>
  );};

export default ListadoConFiltros;
