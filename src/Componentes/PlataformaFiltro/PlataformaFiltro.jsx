import React from 'react';
import { useTranslation } from 'react-i18next';

const PlataformasFiltro = ({ plataformas, seleccionada, onSeleccionar }) => {
    const { t } = useTranslation("catalogo");
    
  return (
    <div className="border-1 border-gray-300 rounded-lg mb-4">
      <label className="block text-gray-800 font-semibold mb-2 mt-2 border-b-1 border-purple-200">{t("dondeVer.dondeVer")}</label>
      <select
        onChange={(e) => onSeleccionar(Number(e.target.value))}
        className="block md:hidden w-full border border-gray-300 rounded px-3 py-2 text-sm"
        value={seleccionada || ''}
      >
        <option value="">{t("dondeVer.plataforma")}</option>
        {plataformas.map((opcion) => (
          <option key={opcion.provider_id} value={opcion.provider_id}>
            {opcion.provider_name}
          </option>
        ))}
      </select>

      <div className="hidden md:grid grid-cols-3 gap-2"> 
        {plataformas.map((opcion) => (
          <button
            key={opcion.provider_id}
            onClick={() => onSeleccionar(opcion.provider_id)}
            className={`rounded-lg border-4 transition-all flex items-center justify-center ${
              seleccionada === opcion.provider_id
                ? 'border-purple-600'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <img
              src={`https://image.tmdb.org/t/p/w154${opcion.logo_path}`}
              alt={opcion.provider_name}
              className="w-16 h-16 object-cover rounded"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlataformasFiltro;
