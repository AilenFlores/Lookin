import React, { useState, useEffect } from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';
import Toast from '../MensajeEmergente/MensajeEmergente';
import { useTranslation } from 'react-i18next';

const SeccionDondeVerla = ({ data }) => {
  const { t } = useTranslation("detalle");
  
  const [toastMsg, setToastMsg] = useState('');
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

  const providerUrls = {
    'Netflix': 'https://www.netflix.com/ar/',
    'Amazon Prime Video': 'https://www.primevideo.com/',
    'Disney Plus': 'https://www.disneyplus.com/es-ar',
    'Star Plus': 'https://www.starplus.com/es-ar',
    'Max': 'https://www.max.com/ar/es',
    'Apple TV': 'https://tv.apple.com/ar',
    'Apple TV+': 'https://tv.apple.com/ar',
    'Paramount Plus': 'https://www.paramountplus.com/ar/',
    'Claro video': 'https://www.clarovideo.com/ar/',
    'MovistarTV': 'https://www.movistarplay.com.ar/',
    'Google Play Movies': 'https://play.google.com/store/movies',
    'YouTube': 'https://www.youtube.com/movies',
    'MUBI': 'https://mubi.com/',
    'Curiosity Stream': 'https://curiositystream.com/',
    'VIX': 'https://www.vix.com/',
    'DIRECTV GO': 'https://www.directvgo.com/',
    'DOCSVILLE': 'https://www.docsville.com/',
    'CINE': 'https://play.cine.ar/bienvenida/',
    'Magellan TV': 'https://www.magellantv.com/',
    'WOW Presents Plus': 'https://www.wowpresentsplus.com/',
    'BroadwayHD': 'https://www.broadwayhd.com/',
    'Filmzie': 'https://www.filmzie.com/',
    'Dekkoo': 'https://www.dekkoo.com/',
    'DocAlliance Films': 'https://www.dafilms.com/',
    'OnDemandKorea': 'https://www.ondemandkorea.com/',
    'Hoichoi': 'https://www.hoichoi.tv/',
    'Pluto TV': 'https://pluto.tv/es/',
    'Eventive': 'https://watch.eventive.org/',
    'Cultpix': 'https://cultpix.com/',
    'FilmBox+': 'https://filmbox.com/',
    'Takflix': 'https://takflix.com/',
    'Sun Nxt': 'https://www.sunnxt.com/',
    'Runtime': 'https://www.runtime.tv',
    'Crunchyroll': 'https://www.crunchyroll.com/es',
    'Paramount Plus Apple TV Channel': 'https://www.paramountplus.com/es/',
    'Shahid VIP': 'https://shahid.mbc.net/ar',
    'Univer Video': 'https://www.univervideo.com/',
    'Plex': 'https://www.plex.tv/',
    'Adrenalina Pura Amazon channel': 'https://www.adrenalinapura.com/',
    'Adrenalina Pura Apple TV channel': 'https://www.adrenalinapura.com/',
    'Mercado Play': 'https://www.mercadolibre.com.ar/',
    'TVCortos Amazon Channel': 'https://www.amazon.com/gp/video/storefront/ref=atv_dp_season_select?ie=UTF8&season=1&tag=tv-cortos-20',
    'Jolt Film': 'https://www.jolttv.com/',
    'FOUND TV': 'https://foundtv.com/',
    'BroadwayHD': 'https://www.broadwayhd.com/',
    'JustWatchTV': 'https://www.justwatch.com/ar/',
  };

  const handleClick = (e, nombre) => {
    if (!providerUrls[nombre]) {
      e.preventDefault();
      setToastMsg(`No tenemos link oficial para ${nombre}`);
    }
  };

  if (plataformas.length === 0 && !mostrarAviso) return null;

  return (
    <div id="ver" className="scroll-mt-[140px]">
      <Subtitulo texto={t("dondeVerla.dondePuedoVerla")} className="font-semibold text-left text-4xl mb-5" />

      {mostrarAviso && (
  <div className="flex items-start gap-3 bg-yellow-100 border border-yellow-400 text-yellow-900 p-4 rounded-md mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 flex-shrink-0 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z" />
    </svg>
    <p className="text-sm">
      <strong>{t("infoDesactualizada.infoDesactualizada1")}</strong> {t("infoDesactualizada.infoDesactualizada2")}
    </p>
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
              onClick={e => handleClick(e, p.provider_name)}
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

      {toastMsg && <Toast mensaje={toastMsg} onClose={() => setToastMsg('')} />}
    </div>
  );
};

export default SeccionDondeVerla;
