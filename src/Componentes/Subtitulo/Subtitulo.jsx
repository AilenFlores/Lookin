import React from 'react';

const Subtitulo = ({ texto, className = "" }) => {
    return (
        <p className={className}>
            {texto}
        </p>
    );
};

export default Subtitulo;
