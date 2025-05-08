import React from 'react';

const Subtitulo = ({ texto, children, className = "" }) => {
    return (
        <p className={className}>
            {texto || children}
        </p>
    );
};

export default Subtitulo;