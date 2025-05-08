import React from 'react';

const Boton = ({ texto, onClick, className = "" }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-black hover:bg-purple-900 m-5 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-300 ${className}`}
            >
            {texto}
        </button>
    );
}

export default Boton;