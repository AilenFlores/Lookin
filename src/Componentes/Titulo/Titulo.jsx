import React from 'react';
const Titulo = ({ onClick, texto, className = "" }) => {
    return (     
        <h1 onClick={onClick} className={`text-2xl font-bold text-center mb-1 ${className}`}>
            {texto}
        </h1>
    );
};

export default Titulo;
