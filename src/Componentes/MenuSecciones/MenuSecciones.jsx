import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const MenuSecciones = ({ sections, data, activeSection }) => {
  const [hayFiltroGuardado, setHayFiltroGuardado] = useState(false);
      const { t } = useTranslation("detalle");

  useEffect(() => {
    const valor = localStorage.getItem('plataforma_filtrada');
    if (valor && !isNaN(Number(valor))) {
      setHayFiltroGuardado(true);
    }
  }, []);

  const labels = {
    sinopsis: t('detalle.sinopsis'),
    info: t('detalle.info'),
    galeria: t('detalle.galeria'),
    reparto: t('detalle.reparto'),
    trailer: t('detalle.trailer'),
    ver: t('detalle.ver'),
    temporadas: t('detalle.temporada'),
    similares: t('detalle.similares'),
  };

  const mostrarSeccion = (section) => {
    if (section === 'ver') {
      const plataformas = data['watch/providers']?.results?.AR?.flatrate || [];
      return plataformas.length > 0 || hayFiltroGuardado;
    }
    if (section === 'trailer') return (data.videos?.results || []).length > 0;
    if (section === 'galeria') {
      const allImages = [...(data.images?.posters || []), ...(data.images?.backdrops || [])];
      return allImages.length > 0;
    }
    if (section === 'reparto') return (data.credits?.cast || []).length > 0;
    if (section === 'similares') return (data.similar?.results || []).length > 0;
    return true;
  };

  return (
    <div className="sticky top-[80px] left-0 w-full z-40 bg-white bg-opacity-80 backdrop-blur-sm shadow-sm border-b border-gray-200">
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none sm:hidden" />
        <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none sm:hidden" />
        <div
          className="
            flex overflow-x-auto gap-3 px-4 py-2 scroll-smooth snap-x snap-mandatory
            sm:grid sm:grid-flow-col sm:auto-cols-fr sm:overflow-visible
          "
        >
          {sections.filter(mostrarSeccion).map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`
                text-center text-sm font-semibold px-6 py-2
                rounded-full snap-start transition whitespace-nowrap
                ${activeSection === section
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-100'}
              `}
            >
              {labels[section]}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSecciones;