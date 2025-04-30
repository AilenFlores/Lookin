import React from 'react';

const Boton = ({ texto, onClick }) => {
    return (
        <button
            onClick={onClick}
            className=" m-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-300"
        >
            {texto}
        </button>
    );
}

export default Boton;