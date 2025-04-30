import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Lista from '../../Componentes/Lista/Lista';
import Cabecera from '../../Componentes/Cabecera/Cabecera';


const DetallePeliculaSerie = () => {
  const { id, tipo } = useParams();
  const [data, setData] = useState(null);
  const [activeSection, setActiveSection] = useState('sinopsis');

  const API_KEY = 'f0bbdd09a3268c4fe8d469dc1db26b5c';

  const sections = ['sinopsis', 'info', 'reparto', 'trailer', 'ver', 'similares'];
  if (tipo === 'tv') sections.push('temporadas');

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=${API_KEY}&language=es&append_to_response=credits,videos,watch/providers,similar`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
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

  if (!data) return <div className="text-white p-5">Cargando...</div>;

  return (
    <div className="p-4 bg-gray-100 text-black space-y-8">
      <Cabecera />
      {/* Encabezado con anclas sticky + scrollspy */}
      <div className="sticky top-0 bg-gray-100 z-10 flex justify-around mb-4 py-2 border-b border-gray-300">
        {sections.map(section => (
          <a
            key={section}
            href={`#${section}`}
            className={`text-sm font-semibold hover:underline ${activeSection === section ? 'text-purple-600 underline' : ''}`}
          >
            {section === 'ver' ? '¿Dónde verla?' : section.charAt(0).toUpperCase() + section.slice(1)}
          </a>
        ))}
      </div>

      {/* Encabezado */}
      <div className="flex flex-col md:flex-row gap-4" id="sinopsis">
        <img src={`https://image.tmdb.org/t/p/w300${data.poster_path}`} alt="Poster" className="rounded-lg w-full md:w-1/4" />
        <div className="bg-purple-100 p-6 rounded-lg flex-1">
          <h1 className="text-3xl font-bold mb-4 text-left">{data.title || data.name}</h1>
          <p className="text-lg text-gray-800 leading-relaxed text-left">{data.overview || 'Sin sinopsis disponible.'}</p>
        </div>
      </div>

      {/* Información */}
      <div className="space-y-2 text-left" id="info">
        <h2 className="font-semibold text-left text-xl flex items-center gap-2">
          <span>📌</span>Información</h2>
        <div className="grid gap-2">
          <div><strong>Género</strong>: {data.genres?.map(g => <span key={g.id} className="bg-purple-200 px-3 py-1 rounded-full text-sm mr-2">{g.name}</span>)}</div>
          <div><strong>Fecha</strong>: <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">{data.release_date || data.first_air_date}</span></div>
          <div><strong>Duración</strong>: <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">{data.runtime || `${data.episode_run_time?.[0]} min`}</span></div>
          <div><strong>Director</strong>: <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">{data.director || data.created_by?.[0]?.name}</span></div>
          <div><strong>Rating</strong>: <span className="bg-purple-200 px-3 py-1 rounded-full text-sm">{data.vote_average ? `${data.vote_average.toFixed(1)} / 10` : 'No disponible'}</span></div>
          {data.vote_average && (
            <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
              <div
                className={`h-full rounded transition-all duration-300 ${
                  data.vote_average >= 7 ? 'bg-green-500' : data.vote_average >= 5 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${(data.vote_average / 10) * 100}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>

      {/* Reparto */}
      <div id="reparto">
        <h2 className="font-semibold text-left text-xl flex items-center gap-2 mb-2">
          <span>📌</span>Reparto</h2>
        <div className="flex overflow-x-auto gap-3 pb-2">
          {data.credits?.cast?.slice(0, 10).map(a => (
            <div key={a.id} className="w-24 flex-shrink-0 text-center">
              <img src={`https://image.tmdb.org/t/p/w185${a.profile_path}`} alt={a.name} title={a.name} className="w-full h-28 object-cover rounded-md transition-transform duration-200 hover:scale-105" />
              <p className="text-xs mt-1">{a.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trailer */}
      <div id="trailer">
        <h2 className="font-semibold text-left text-xl flex items-center gap-2 mb-2">
          <span>📌</span>Trailer</h2>
        {data.videos?.results?.length ? (
          <iframe
            className="w-full aspect-video rounded-lg"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            title="Trailer"
            allowFullScreen
          ></iframe>
        ) : <p className="text-sm">No hay trailer disponible.</p>}
      </div>

      {/* ¿Dónde verla? */}
      <div id="ver">
        <h2 className="font-semibold text-left text-xl flex items-center gap-2 mb-2">
          <span>📌</span>¿Dónde puedo verla?</h2>
        <div className="flex gap-2">
          {data["watch/providers"]?.results?.AR?.flatrate?.map(p => (
            <img key={p.provider_id} src={`https://image.tmdb.org/t/p/w45${p.logo_path}`} alt={p.provider_name} title={p.provider_name} className="h-10 w-auto transition-transform duration-200 hover:scale-110" />
          )) || <span className="text-sm">No disponible.</span>}
        </div>
      </div>

      {/* Títulos similares */}
      <div id="similares">
  <h2 className="font-semibold mb-2 text-left text-xl flex items-center gap-2">
    <span>📌</span> Títulos similares
  </h2>
  <Lista peliculas={data.similar?.results?.slice(0, 10)} texto="Títulos similares" cargarMas={null} tipo={tipo} />

</div>

      {/* Temporadas (solo para series) */}
      {tipo === 'tv' && (
        <div id="temporadas">
          <h2 className="font-semibold text-left text-xl flex items-center gap-2 mb-2">
            <span>📌</span>Temporadas</h2>
          <div className="flex flex-wrap gap-4">
            {data.seasons?.map(season => (
              <div key={season.id} className="w-40 bg-white rounded-md shadow p-2 text-sm">
                <img src={`https://image.tmdb.org/t/p/w185${season.poster_path}`} alt={season.name} className="w-full h-32 object-cover rounded" />
                <h3 className="font-semibold mt-1 text-center">{season.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetallePeliculaSerie;
