import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Carrusel from '../../Componentes/Carrusel/Carrusel';
import Subtitulo from '../../Componentes/Subtitulo/Subtitulo';
import Cabecera from '../../Componentes/Cabecera/Cabecera';
import AcordeonTemporadas from '../../Componentes/AcordeonTemporadas/AcordeonTemporadas';

const DetallePeliculaSerie = () => {
  const { id, tipo } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [activeSection, setActiveSection] = useState('sinopsis');

  const API_KEY = 'f0bbdd09a3268c4fe8d469dc1db26b5c';
  const sections = ['sinopsis', 'info', 'galeria', 'reparto', 'trailer', 'ver', 'similares'];
  if (tipo === 'tv') sections.splice(6, 0, 'temporadas');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${tipo}/${id}?api_key=${API_KEY}&language=es&append_to_response=credits,videos,watch/providers,similar,images`
        );
        if (!res.ok) throw new Error('Error al obtener los datos');
        const json = await res.json();
        setData(json);
        setError(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setError(true);
      }
    };
    obtenerDatos();
  }, [id, tipo]);

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  if (error) return <div className="text-white p-5">Error al cargar los datos.</div>;
  if (!data) return <div className="text-white p-5">Cargando...</div>;

  return (
    <>
      <Cabecera />

      {/* Menú fijo debajo de la cabecera */}
      <div className="sticky top-[80px] left-0 w-full bg-gray-100 z-40 flex justify-around py-2 border-b border-gray-300">
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
            return (
              <a
                key={section}
                href={`#${section}`}
                className={`text-sm font-semibold hover:underline ${
                  activeSection === section ? 'text-purple-600 underline' : ''
                }`}
              >
                {labels[section] || section}
              </a>
            );
          })}
      </div>



      <div className="bg-neutral-100 m-5 rounded-lg border-2 border-gray-300 shadow-lg"> 

          
        <div className="pt-[50px] px-8 md:px-35 bg-white-100 text-black space-y-8">
          {/* Sinopsis */}
          <div className="flex flex-col md:flex-row gap-6 p-6 bg-purple-100 rounded-lg shadow" id="sinopsis" >
            <div className="w-full md:w-1/4 flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
                alt="Poster"
                className="rounded-lg w-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-4">
              <Subtitulo
                texto={data.title || data.name}
                className="font-bold text-left text-4xl pb-1 p-10"
              />
              <div className="flex items-center gap-6 text-sm font-medium text-gray-800 p-10 py-0">
                {/* Rating */}
                <span className="w-9 h-9 rounded-full border-2 border-yellow-500 text-yellow-500 flex items-center justify-center ">
                  {Math.round(data.vote_average * 10)}%
                </span>

                {/* Duración con separador */}
                <span className="border-l border-gray-300 pl-4">
                  {data.runtime ? `${data.runtime} min` : 'Duración no disponible'}
                </span>

                {/* Año con separador */}
                <span className="border-l border-gray-300 pl-4">
                  {data.release_date?.slice(0, 4) || data.first_air_date?.slice(0, 4) || 'Año N/A'}
                </span>
              </div>

              <p className="text-lg leading-relaxed text-gray-800 text-left p-10 py-0">
                {data.overview || 'Sin sinopsis disponible.'}
              </p>
            </div>
          </div>

          {/* Información */}
          <div className="space-y-4 text-left" id="info">
            <Subtitulo texto="Información" className="font-semibold text-left text-4xl" />
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
              <div>
                <strong>Popularidad:</strong>{' '}
                <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">
                  {data.popularity?.toFixed(1) || 'No disponible'}
                </span>
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
            <div id="galeria" className="py-8">
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

          {/* Reparto */}
          <div id="reparto">
            <Subtitulo texto="Reparto" className="font-semibold text-left text-4xl mb-2" />
            <Carrusel
              contenido={data.credits?.cast?.slice(0, 10) || []}
              tipo="pequeno"
              mediaType="person"   // <<-- aquí forzamos 'person'
            />
          </div>


          {/* Trailer (solo si hay al menos un video) */}
          {data.videos?.results?.length > 0 && (
            <div id="trailer">
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
            <div id="ver">
              <Subtitulo texto="¿Dónde puedo verla?" className="font-semibold text-left text-4xl mb-2" />
              <div className="flex gap-2">
                {data["watch/providers"].results.AR.flatrate.map(p => (
                  <img
                    key={p.provider_id}
                    src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                    alt={p.provider_name}
                    className="h-10"
                  />
                ))}
              </div>
            </div>
          )}


          {tipo === 'tv' && (
            <div id="temporadas">
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

          {/* Similares */}
          <div id="similares">
            <Subtitulo texto="Títulos similares" className="font-semibold text-left text-4xl mb-2" />
            <Carrusel
            contenido={data.similar?.results || []}
            tipo="grande"
            mediaType={tipo}   // aquí
            />
          </div>
        </div>
      </div>
    </>
    
  );
};

export default DetallePeliculaSerie;
