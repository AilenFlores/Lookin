const API_KEY = 'f0bbdd09a3268c4fe8d469dc1db26b5c';
let language = "es";
export const getTendencias = async (language) => {
  try {
    const url = `https://api.themoviedb.org/3/trending/all/day?language=${language}&api_key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results; 
  } catch (err) {
    console.error('Error al obtener tendencias:', err);
    return [];
  }
};

export const getEstrenosEnCines = async (language) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&region=AR&language=${language}&page=1`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results.map(pelicula => ({
      ...pelicula,
      media_type: 'movie',
    }));
  } catch (err) {
    console.error('Error al obtener estrenos:', err);
    return [];
  }
};




/**Contruye los parametros para la url */
const construirParametros = (pagina, filtros, tipo,language) => {
  const hoy = new Date().toISOString().split('T')[0];
  const orden = filtros.orden || 'popularity.desc'; 
  const params = new URLSearchParams({
    api_key: API_KEY,
    language,
    region: 'AR',
    page: pagina,
    sort_by: orden,
  });

  if (filtros.plataforma) {
    params.append('with_watch_providers', filtros.plataforma);
    params.append('watch_region', 'AR');
  }

  if (tipo === 'tv') {
    params.append('vote_average.gte', 7);
    params.append('vote_count.gte', 100);
    params.append('first_air_date.lte', hoy); 
  } else {
    params.append('release_date.lte', hoy); 
  }

  return params;
};


const construirURL = (tipo, pagina, filtros,language) => {
  const params = construirParametros(pagina, filtros, tipo,language);
  const url = `https://api.themoviedb.org/3/discover/${tipo}?${params.toString()}`;
  return url;
};


export const getContenido = async (tipo, pagina, filtros = {},language) => {
  try {
    const url = construirURL(tipo, pagina, filtros,language);
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || !data.results) {
      throw new Error(data.status_message || "Error al obtener datos");
    }

    return data.results.map(item => ({
      ...item,
      media_type: tipo
    }));
  } catch (err) {
    console.error('Error en getContenido:', err);
    throw err;
  }
};

export const getPlataformas = async (tipo,language) => {
  try {
    const url = `https://api.themoviedb.org/3/watch/providers/${tipo}?api_key=${API_KEY}&language=${language}&watch_region=AR`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results.filter(plataforma => plataforma.provider_id !== 0);
  } catch (err) {
    console.error('Error al obtener plataformas:', err);
    return [];
  }
};

/**Pide a la api el contenido, ya sea peliculas o series */
export const getDetallePorId = async (id, tipo, language) => {
  try {
    const url = `https://api.themoviedb.org/3/${tipo}/${id}?api_key=${API_KEY}&language=${language}&append_to_response=credits,videos,watch/providers,similar,images,release_dates,content_ratings&watch_region=AR`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('No se pudo obtener el detalle');
    return await res.json();
  } catch (err) {
    console.error('Error al obtener detalle:', err);
    return null;
  }
};

/**Pide a la api los episodios de una temporada de una serie */
export const getTemporada = async (tvId, seasonNumber,language) => {
  try {
    const url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=${language}`;
    const res = await fetch(url);
    const data = await res.json();

    const episodes = data.episodes || [];
    const sum = episodes.reduce((acc, ep) => acc + (ep.vote_average || 0), 0);
    const rating = episodes.length ? (sum / episodes.length).toFixed(1) : null;

    return {
      episodes,
      rating
    };
  } catch (err) {
    console.error('Error al obtener temporada:', err);
    return {
      episodes: [],
      rating: null
    };
  }
};

export const buscarContenido = async (query, page = 1,language) => {
  try {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=${language}&query=${encodeURIComponent(query)}&page=${page}&include_adult=false&region=AR`;
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || !data.results) {
      throw new Error(data.status_message || "Error al buscar contenido");
    }

    const resultados = data.results.map(item => ({
      ...item,
      media_type: item.media_type || 'movie'
    }));

    return {
      resultados,
      total_pages: data.total_pages
    };
  } catch (err) {
    console.error('Error en buscarContenido:', err);
    return {
      resultados: [],
      total_pages: 1
    };
  }
};

