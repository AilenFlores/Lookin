import React from 'react';
import logoDefault from '../../Assets/Imagenes/Logo.png'; 

const Logo = ({
    src = logoDefault,
    alt = 'Logo',
    width = 120,
    height = 'auto',
    className = '',
    onClick
}) => {
    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`object-contain ${className}`}
            onClick={onClick}
        />
);
};

export default Logo;