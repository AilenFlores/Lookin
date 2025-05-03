import React from 'react';

const MenuSecciones = ({ sections, data, activeSection }) => {
  const labels = {
    sinopsis: 'Sinopsis',
    info: 'Información',
    galeria: 'Galería',
    reparto: 'Reparto',
    trailer: 'Trailer',
    ver: '¿Dónde verla?',
    temporadas: 'Temporadas',
    similares: 'Similares'
  };

  const mostrarSeccion = (section) => {
    if (section === 'ver') return (data['watch/providers']?.results?.AR?.flatrate || []).length > 0;
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
    <div className="sticky top-[112px] left-0 w-full z-40 bg-white bg-opacity-80 backdrop-blur-sm shadow-sm overflow-x-auto border-b border-gray-200">
      <div className="grid grid-flow-col auto-cols-fr gap-3 px-4 py-2">
        {sections.filter(mostrarSeccion).map(section => (
          <a
            key={section}
            href={`#${section}`}
            className={`
              text-center
              text-sm font-semibold
              px-6 py-2
              transition
              ${activeSection === section
                ? 'bg-purple-600 text-white'
                : 'text-gray-700 hover:text-purple-600 hover:bg-purple-100'}
              rounded-full
            `}
          >
            {labels[section]}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MenuSecciones;
