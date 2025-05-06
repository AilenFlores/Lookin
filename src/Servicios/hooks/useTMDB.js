import { useTranslation } from 'react-i18next';
import {
  getTendencias as rawGetTendencias,
  getEstrenosEnCines as rawGetEstrenosEnCines,
  getDetallePorId as rawGetDetallePorId,
  getTemporada as rawGetTemporada,
  getContenido as rawGetContenido,
  getPlataformas as rawGetPlataformas,
  buscarContenido as rawBuscarContenido
} from '../apiTMDB';

export const useTMDB = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return {
    getTendencias: () => rawGetTendencias(lang),
    getEstrenosEnCines: () => rawGetEstrenosEnCines(lang),
    getDetallePorId: (id, tipo) => rawGetDetallePorId(id, tipo, lang),
    getTemporada: (tvId, seasonNumber) => rawGetTemporada(tvId, seasonNumber, lang),
    getContenido: (tipo, pagina, filtros) => rawGetContenido(tipo, pagina, filtros, lang),
    getPlataformas: (tipo) => rawGetPlataformas(tipo, lang),
    buscarContenido: (query, page = 1) => rawBuscarContenido(query, page, lang),
  };
};
