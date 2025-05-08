import React, { useState } from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';
import { FaStar } from 'react-icons/fa';
import { useTMDB } from '../../Servicios/hooks/useTMDB';
import { useTranslation } from "react-i18next";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Titulo from '../Titulo/Titulo';

const AcordeonTemporadas = ({ tvId, seasonNumber, posterPath, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [episodes, setEpisodes] = useState(null);
  const [seasonRating, setSeasonRating] = useState(null);
  const [expanded, setExpanded] = useState({});
  const { getTemporada } = useTMDB();
  const { t, i18n } = useTranslation("varios");
  const toggleOpen = async () => {
    if (!isOpen && !episodes) {
      const { episodes: episodios, rating } = await getTemporada(tvId, seasonNumber, i18n.language);
      setEpisodes(episodios);
      setSeasonRating(rating);
    }
    setIsOpen(open => !open);
  };
  const toggleEpisode = id => {
    setExpanded(e => ({ ...e, [id]: !e[id] }));
  };

  return (
    <div className="w-full bg-white rounded-md overflow-hidden mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <button onClick={toggleOpen} className="w-full flex justify-between items-center p-2 hover:bg-gray-100">
        <div className="flex items-center gap-3">
          <img
            src={`https://image.tmdb.org/t/p/w185${posterPath}`}
            alt={name}
            className="w-16 h-20 object-cover rounded"
          />
          <div>
            <Titulo texto={name} className="font-semibold" />
            <Subtitulo
              texto={
                episodes
                  ? `${episodes.length} ${t("episodios.episodios")}`
                  : t("episodios.verEpisodios")
              }
              className="text-sm text-gray-600"
            />
          </div>
        </div>
        {seasonRating && (
          <span className="flex items-center text-yellow-500 font-bold">
            <FaStar className="mr-1" /> {seasonRating}
          </span>
        )}
      </button>
      {isOpen && episodes && (
        <div className="p-4 space-y-4 bg-gray-50">
          <Subtitulo
            texto={t("episodios.tituloTemporada", { number: seasonNumber })}
            className="text-xl mb-2"
          />
          {episodes.map(ep => (
            <div key={ep.id} className="border-b pb-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  E{ep.episode_number} – {ep.name}
                </span>
                <div className="flex items-center gap-4">
                  {ep.vote_average != null && (
                    <span className="flex items-center text-yellow-500 font-semibold">
                      <FaStar className="mr-1" />{ep.vote_average.toFixed(1)}
                    </span>
                  )}
                  {ep.overview && (
                    <button
                    onClick={() => toggleEpisode(ep.id)}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                    {expanded[ep.id] ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  )}
                </div>
              </div>
              {expanded[ep.id] && ep.overview && (
                <Subtitulo
                texto={ep.overview}
                className="mt-1 text-sm text-gray-700 text-left"
              />              
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AcordeonTemporadas;