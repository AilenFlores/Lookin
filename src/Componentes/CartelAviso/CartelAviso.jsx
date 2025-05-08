import React from 'react';
import { FaSearch } from 'react-icons/fa';
import Subtitulo from '../Subtitulo/Subtitulo';

const CartelAviso = ({ mensaje }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center border border-gray-200 bg-gray-50 py-10 px-6 rounded-md shadow-sm">
      <div className="bg-purple-100 text-purple-600 p-4 rounded-full mb-4">
        <FaSearch className="text-3xl" />
      </div>
      <Subtitulo
        texto={mensaje}
        className="text-gray-600 text-lg font-medium text-center"
      />
    </div>
  );
};

export default CartelAviso;