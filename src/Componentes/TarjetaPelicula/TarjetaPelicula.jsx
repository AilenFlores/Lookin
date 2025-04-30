import React from 'react';
import Titulo from '../Titulo/Titulo';
import Subtitulo from '../Subtitulo/Subtitulo';
import BotonFav from '../BotonFav/BotonFav';

const TarjetaPelicula = ({ pelicula, onClick }) => {
    return (
        <div className="relative rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col overflow-hidden w-52 m-2"
            onClick={() => onClick(pelicula)}
        >
            <div className="absolute top-2 right-2 z-10">
                <BotonFav pelicula={pelicula} />
            </div>
            
            <img
                src={`https://image.tmdb.org/t/p/w200${pelicula.poster_path}`}
                alt={pelicula.title || pelicula.name}
                className="h-64 w-full object-cover"
            />
            <div className="p-2 bg-gray-800 hover:bg-gray-700 transition-colors duration-300 flex flex-col justify-between flex-grow">
                <Titulo texto={pelicula.title || pelicula.name} className="text-base font-bold text-white text-center" />
                <Subtitulo texto={pelicula.media_type === "movie" ? "Película" : "Serie"} className="text-sm text-gray-400 text-center" />
            </div>
        </div>
    );
};

export default TarjetaPelicula;
