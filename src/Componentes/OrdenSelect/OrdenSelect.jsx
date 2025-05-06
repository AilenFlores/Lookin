import React from 'react';
import { useTranslation } from 'react-i18next';

const OrdenSelect = ({ ordenes, valorSeleccionado, onChange }) => {
    const { t } = useTranslation("catalogo");
  
  return (
    <div className="border-1 border-gray-300 rounded-lg p-4 mb-4">
      <label className="block text-gray-800 font-semibold mb-2">{t("ordenar.ordenarPor")}</label>
      <select
        onChange={(e) => onChange(e.target.value)}
        value={valorSeleccionado}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
      >
        {ordenes.map((opcion) => (
          <option key={opcion.value} value={opcion.value}>
            {opcion.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrdenSelect;
