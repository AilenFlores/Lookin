import React from 'react';

const Titulo = ({ texto, className = "" }) => {
    return (
        <h1 className={`text-2xl font-bold text-center mb-1 ${className}`}>
            {texto}
        </h1>
    );
};

export default Titulo;
