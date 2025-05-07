export const traducirCertificacion = (codigo) => {
    if (!codigo) return null;

    const mapa = {
        'G': 'ATP',
        'PG': '10+',
        'PG-13': '13+',
        'R': '16+',
        'NC-17': '18+',
        'TV-Y': 'ATP',
        'TV-Y7': '7+',
        'TV-G': 'ATP',
        'TV-PG': '10+',
        'TV-14': '14+',
        'TV-MA': '18+',
        'ATP': 'ATP',
        '13': '13+',
        '16': '16+',
        '18': '18+',
        'C': 'C',
        'SAM 13': '13+',
        'SAM 16': '16+',
        'SAM 18': '18+'
    };

    return mapa[codigo] || codigo;
};

export const obtenerCertificacion = (releaseDates, region = 'AR') => {
    const pais = releaseDates?.results?.find(r => r.iso_3166_1 === region);
    const conCertificado = pais?.release_dates?.find(r => r.certification?.length > 0);

    if (!conCertificado) {
        const fallback = releaseDates?.results?.find(r => r.iso_3166_1 === 'US');
        const alternativa = fallback?.release_dates?.find(r => r.certification?.length > 0);
        return traducirCertificacion(alternativa?.certification) || null;
    }

    return traducirCertificacion(conCertificado.certification) || null;
};

export const obtenerCertificacionSerie = (content_ratings, region = 'AR') => {
    const pais = content_ratings?.results?.find(r => r.iso_3166_1 === region);
    const fallback = content_ratings?.results?.find(r => r.iso_3166_1 === 'US');
    const rating = pais?.rating || fallback?.rating;
    return traducirCertificacion(rating);
};