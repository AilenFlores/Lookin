import React from "react";
import TarjetaPelicula from "../TarjetaPelicula/TarjetaPelicula";
import Boton from "../Boton/Boton";
import Titulo from "../Titulo/Titulo";

const Lista = ({ peliculas, cargarMas, texto }) => {

    const handleClick = (pelicula) => {
        console.log(pelicula.id);  
    };

    return (
        <div className="bg-neutral-100 p-3"> 
            <Titulo texto={texto} className="text-2xl mb-5 mt-5 text-black" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center">
                {peliculas.map((pelicula) => (
                    <TarjetaPelicula
                        key={pelicula.id}
                        pelicula={pelicula}
                        onClick={handleClick}  
                    />
                ))}
            </div>
            <Boton texto="Cargar más" onClick={cargarMas} />
        </div>
    );
};

export default Lista;
