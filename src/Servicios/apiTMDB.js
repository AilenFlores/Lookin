const API_KEY = 'f0bbdd09a3268c4fe8d469dc1db26b5c';

export const getTendencias = async () => {
  try {
    const url = `https://api.themoviedb.org/3/trending/all/day?language=es&api_key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results; 
  } catch (err) {
    console.error('Error al obtener tendencias:', err);
    return [];
  }
};

export const getEstrenosEnCines = async () => {
  try {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&region=AR&language=es&page=1`;
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
const construirParametros = (pagina, filtros, tipo) => {
  const hoy = new Date().toISOString().split('T')[0];
  const orden = filtros.orden || 'popularity.desc'; 
  const params = new URLSearchParams({
    api_key: API_KEY,
    language: 'es',
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


const construirURL = (tipo, pagina, filtros) => {
  const params = construirParametros(pagina, filtros, tipo);
  const url = `https://api.themoviedb.org/3/discover/${tipo}?${params.toString()}`;
  return url;
};


export const getContenido = async (tipo, pagina, filtros = {}) => {
  try {
    const url = construirURL(tipo, pagina, filtros);
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

export const getPlataformas = async (tipo) => {
  try {
    const url = `https://api.themoviedb.org/3/watch/providers/${tipo}?api_key=${API_KEY}&language=es&watch_region=AR`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results.filter(plataforma => plataforma.provider_id !== 0);
  } catch (err) {
    console.error('Error al obtener plataformas:', err);
    return [];
  }
};



/**Pide a la api el contenido, ya sea peliculas o series */
export const getDetallePorId = async (id, tipo) => {
  try {
    const url = `https://api.themoviedb.org/3/${tipo}/${id}?api_key=${API_KEY}&language=es&append_to_response=credits,videos,watch/providers,similar,images`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('No se pudo obtener el detalle');
    return await res.json();
  } catch (err) {
    console.error('Error al obtener detalle:', err);
    return null;
  }
};

/**Pide a la api los episodios de una temporada de una serie */
export const getTemporada = async (tvId, seasonNumber) => {
  try {
    const url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=es`;
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
