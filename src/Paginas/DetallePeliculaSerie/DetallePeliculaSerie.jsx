import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Carrusel from '../../Componentes/Carrusel/Carrusel';
import Subtitulo from '../../Componentes/Subtitulo/Subtitulo';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import AcordeonTemporadas from '../../Componentes/AcordeonTemporadas/AcordeonTemporadas';
import GuardarFavorito from '../../Componentes/GuardarFavorito/GuardarFavorito';
import Pie from '../../Componentes/Pie/Pie';
import { getDetallePorId } from '../../Servicios/apiTMDB';
import Cargando from '../../Componentes/Cargando/Cargando';


const DetallePeliculaSerie = () => {
  const { id, tipo } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [activeSection, setActiveSection] = useState('sinopsis');
  const sections = ['sinopsis', 'info', 'galeria', 'reparto', 'trailer', 'ver', 'similares'];
  if (tipo === 'tv') sections.splice(6, 0, 'temporadas');

  useEffect(() => {
    const obtenerDatos = async () => {
      const resultado = await getDetallePorId(id, tipo);
      if (resultado) {
        setData(resultado);
        setError(false);
      } else {
        setError(true);
      }
    };
    obtenerDatos();
  }, [id, tipo]);

  useEffect(() => {
    const headerHeight = 185;
    const handleScroll = () => {
      for (const section of sections) {
        const el = document.getElementById(section);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);
  

  if (error) return <div className="text-white p-5">Error al cargar los datos.</div>;
  if (!data) return <Cargando />;

  return (
    <>
      <Cabecera />

      {/* Menú fijo debajo de la cabecera */}
      <div className="sticky top-[112px] left-0 w-full z-40 bg-white bg-opacity-80 backdrop-blur-sm shadow-sm overflow-x-auto border-b border-gray-200">
        <div className="grid grid-flow-col auto-cols-fr gap-3 px-4 py-2">
          {sections
            .filter(section => {
              if (section === 'ver') {
                return (data['watch/providers']?.results?.AR?.flatrate || []).length > 0;
              }
              if (section === 'trailer') {
                return (data.videos?.results || []).length > 0;
              }
              if (section === 'galeria') {
                const allImages = [
                  ...(data.images?.posters || []),
                  ...(data.images?.backdrops || [])
                ];
                return allImages.length > 0;
              }
              if (section === 'reparto') {
                return (data.credits?.cast || []).length > 0;
              }
              if (section === 'similares') {
                return (data.similar?.results || []).length > 0;
              }
              return true;
            })
            .map(section => {
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
              const isActive = activeSection === section;
              return (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`
                    text-center
                    text-sm font-semibold
                    px-6 py-2
                    transition
                    ${isActive
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-100'}
                    rounded-full
                  `}
                >
                  {labels[section]}
                </a>
              );
            })}
        </div>
      </div>

      <div className="bg-neutral-100 m-5 rounded-lg border-2 border-gray-300 shadow-lg"> 
          
        <div className="pt-[50px] px-8 md:px-35 bg-white-100 text-black space-y-8">
          {/* Sinopsis */}
          <div
            className="scroll-mt-[180px] flex flex-col md:flex-row gap-6 p-6 bg-purple-100 rounded-lg shadow"
            id="sinopsis"
          >
            {/* Columna de la imagen con su propio contenedor relativo */}
            <div className="w-full md:w-1/4 flex-shrink-0">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
                  alt="Poster"
                  className="w-full object-cover"
                />
                {/* Botón de favorito posicionado encima de la imagen */}
                <div className="absolute top-2 right-2 z-10">
                  <GuardarFavorito pelicula={data} />
                </div>
              </div>
            </div>

            {/* La parte de texto (título, rating, sinopsis, etc.) */}
            <div className="flex-1 space-y-4">
              <Subtitulo
                texto={data.title || data.name}
                className="font-bold text-left text-4xl pb-1"
              />
              <div className="flex items-center gap-6 text-sm font-medium text-gray-800">
                {/* Rating */}
                <span className="w-9 h-9 rounded-full border-2 border-yellow-500 text-yellow-500 flex items-center justify-center">
                  {Math.round(data.vote_average * 10)}%
                </span>
                {/* Duración con separador */}
                <span className="border-l border-gray-300 pl-4">
                  {data.runtime ? `${data.runtime} min` : 'Duración no disponible'}
                </span>
                {/* Año con separador */}
                <span className="border-l border-gray-300 pl-4">
                  {data.release_date?.slice(0, 4) ||
                  data.first_air_date?.slice(0, 4) ||
                  'Año N/A'}
                </span>
              </div>
              <p className="text-lg leading-relaxed text-gray-800 text-left">
                {data.overview || 'Sin sinopsis disponible.'}
              </p>
            </div>
          </div>


          {/* Información */}
          <div id="info" className="scroll-mt-[180px] space-y-4 text-left">            <Subtitulo texto="Información" className="font-semibold text-left text-4xl" />
            <div className="space-y-3">
              <div>
                <strong>Director:</strong>{' '}
                <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
                  {data.created_by?.[0]?.name || 'No disponible'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
              <strong>Género:</strong>
              {data.genres?.length ? (
                data.genres.map(g => (
                  <span
                    key={g.id}
                    className="bg-purple-200 px-3 py-1 rounded-full text-sm"
                  >
                    {g.name}
                  </span>
                ))
              ) : (
                <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
                  No disponible
                </span>
              )}
            </div>



              <div>
                <strong>Idioma original:</strong>{' '}
                <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
                  {data.original_language?.toUpperCase() || 'No disponible'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <strong>Compañías de producción:</strong>
                {data.production_companies?.length ? (
                  data.production_companies.map(pc => (
                    <span
                      key={pc.id}
                      className="bg-purple-200 px-3 py-1 rounded-full text-sm"
                    >
                      {pc.name}
                    </span>
                  ))
                ) : (
                  <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
                    No disponible
                  </span>
                )}
              </div>

              <div>
                <strong>Presupuesto:</strong>{' '}
                <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
                  {data.budget ? `$${data.budget.toLocaleString()}` : 'No disponible'}
                </span>
              </div>
              <div>
                <strong>Recaudación:</strong>{' '}
                <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
                  {data.revenue ? `$${data.revenue.toLocaleString()}` : 'No disponible'}
                </span>
              </div>
              <div className="flex items-center gap-2 relative group">
                <strong>Popularidad:</strong>
                <div className="flex items-center gap-1 relative">
                  {/* Valor de popularidad */}
                  <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
                    🔥 {data.popularity?.toFixed(1) || 'No disponible'}
                  </span>

                  {/* Ícono de ayuda */}
                  <span
                    className="text-gray-600 text-xs cursor-pointer select-none relative"
                    tabIndex={0}
                  >
                    ℹ️

                    {/* Tooltip */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-[150%] md:left-full md:top-1/2 md:-translate-y-1/2 md:ml-2 
                                w-[220px] bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100
                                group-focus-within:opacity-100 group-hover:pointer-events-auto group-focus-within:pointer-events-auto 
                                transition-opacity z-50 text-center shadow-lg"
                    >
                      Nivel de interés según visualizaciones y actividad reciente.
                    </div>
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Galería (solo si hay imágenes) */}
          {(
            [
              ...(data.images.posters || []).map(img => ({ ...img, type: 'poster' })),
              ...(data.images.backdrops || []).map(img => ({ ...img, type: 'backdrop' }))
            ].length > 0
          ) && (
            <div id="galeria" className="py-8 scroll-mt-[150px]">
              <Subtitulo texto="Galería" className="text-4xl font-semibold mb-4 text-left" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  ...(data.images.posters || []).map(img => ({ ...img, type: 'poster' })),
                  ...(data.images.backdrops || []).map(img => ({ ...img, type: 'backdrop' }))
                ].map((img, idx) => (
                  <div key={idx} className="overflow-hidden rounded-lg">
                    <a
                      href={`https://image.tmdb.org/t/p/original${img.file_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w300${img.file_path}`}
                        alt={`${img.type} ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg transition-transform duration-300 hover:scale-125 cursor-zoom-in"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reparto (solo si hay cast) */}
          {(data.credits?.cast || []).length > 0 && (
            <div
              id="reparto"
              className="scroll-mt-[180px]"
            >
              <Subtitulo texto="Reparto" className="font-semibold text-left text-4xl mb-2" />
              <Carrusel
                contenido={data.credits.cast.slice(0, 10)}
                tipo="pequeno"
                mediaType="person"
              />
            </div>
          )}



          {/* Trailer (solo si hay al menos un video) */}
          {data.videos?.results?.length > 0 && (
            <div id="trailer" className="scroll-mt-[180px]" >
              <Subtitulo texto="Trailer" className="font-semibold text-left text-4xl mb-2" />
              <div className="mx-auto w-full md:w-3/4 lg:w-5/2 max-w-4xl">
                <div className="aspect-video rounded-lg overflow-hidden shadow">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                    title="Trailer"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}



          {/* ¿Dónde verla? (solo si hay ofertas) */}
{(data["watch/providers"]?.results?.AR?.flatrate || []).length > 0 && (
  <div id="ver" className="scroll-mt-[180px]">
    <Subtitulo texto="¿Dónde puedo verla?" className="font-semibold text-left text-4xl mb-5" />
    <div className="flex gap-4 flex-wrap">
      {data["watch/providers"].results.AR.flatrate.map(p => (
        <div
          key={p.provider_id}
          className="flex flex-col items-center w-24 hover:scale-105 transition-transform duration-300"
        >
          <img
            src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}
            alt={p.provider_name}
            className="h-20 object-contain drop-shadow-md"
          />
          <span className="text-sm text-gray-700 mt-1 text-center">{p.provider_name}</span>
        </div>
      ))}
    </div>
  </div>
)}



          {tipo === 'tv' && (
            <div id="temporadas" className="scroll-mt-[180px]" >
              <Subtitulo texto="Temporadas" className="font-semibold text-left text-4xl mb-4" />
              <div className="flex flex-wrap gap-4">
                {data.seasons?.map(season => (
                  <AcordeonTemporadas
                    key={season.id}
                    tvId={id}
                    seasonNumber={season.season_number}
                    posterPath={season.poster_path}
                    name={season.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Similares (sigue igual) */}
          {(data.similar?.results || []).length > 0 && (
            <div id="similares" className="scroll-mt-[180px]" >
              <Subtitulo texto="Títulos similares" className="font-semibold text-left text-4xl mb-2" />
              <Carrusel
                contenido={data.similar.results}
                tipo="grande"
                mediaType={tipo}
              />
            </div>
          )}
        </div>
      </div>
      <Pie/>
    </>
    
  );
};

export default DetallePeliculaSerie;
