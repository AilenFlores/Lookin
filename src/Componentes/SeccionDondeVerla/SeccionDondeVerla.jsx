import React, { useState, useEffect } from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';
import MensajeEmergente from '../MensajeEmergente/MensajeEmergente';
import { useTranslation } from 'react-i18next';
import ProvidersUrl from '../../const/ProvidersUrl';
import Titulo from '../Titulo/Titulo';

const SeccionDondeVerla = ({ data }) => {
  const { t } = useTranslation(["detalle", "varios"]);
  const [mensajeEmergente, setMensajeEmergente] = useState('');
  const plataformas = data["watch/providers"]?.results?.AR?.flatrate || [];
  const [plataformaFiltrada, setPlataformaFiltrada] = useState(null);

  useEffect(() => {
  const idGuardado = localStorage.getItem('plataforma_filtrada');
    if (idGuardado) {
      setPlataformaFiltrada(Number(idGuardado));
      localStorage.removeItem('plataforma_filtrada');
    }
  }, []);

  const idsDisponibles = plataformas.map(p => p.provider_id);
  const mostrarAviso = plataformaFiltrada && !idsDisponibles.includes(plataformaFiltrada);
  const providerUrls = ProvidersUrl;
  const manejarClick = (e, nombre) => {
    if (!providerUrls[nombre]) {
      e.preventDefault();
      setMensajeEmergente(t("mensajeEmergente.sinLink", { plataforma: nombre }));
    }
  };

  if (plataformas.length === 0 && !mostrarAviso) return null;

  return (
    <div id="ver" className="scroll-mt-[140px]">
      <Titulo
        texto={t("dondeVerla.dondePuedoVerla")}
        className="text-3xl md:text-4xl font-semibold text-black pl-6 border-l-4 border-purple-600 mb-4 text-left"
      />
      {mostrarAviso && (
        <div className="flex items-start gap-3 bg-yellow-100 border border-yellow-400 text-yellow-900 p-4 rounded-md mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 flex-shrink-0 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z" />
          </svg>
          <Subtitulo className="text-sm">
          <strong>{t("infoDesactualizada.infoDesactualizada1")}</strong> {t("infoDesactualizada.infoDesactualizada2")}
        </Subtitulo>
        </div>
      )}
      <div className="flex gap-4 flex-wrap ">
        {plataformas.map(p => {
          const link = providerUrls[p.provider_name] || '#';
          return (
            <a
              key={p.provider_id}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => manejarClick(e, p.provider_name)}
              className="flex flex-col items-center w-24 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}
                alt={p.provider_name}
                className="h-20 object-contain drop-shadow-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] rounded-md"
              />
              <span className="text-sm text-gray-700 mt-1 text-center">{p.provider_name}</span>
            </a>
          );
        })}
      </div>
      {mensajeEmergente && <MensajeEmergente mensaje={mensajeEmergente} onClose={() => setMensajeEmergente('')} />}
    </div>
  );
};

export default SeccionDondeVerla;