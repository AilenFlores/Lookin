import React, { useEffect } from 'react';
import Cargando from '../Cargando/Cargando';

const ModalImagen = ({ src, onClose, isLoading, setIsLoading }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
        className="fixed inset-0 bg-[rgba(229,231,235,0.8)] flex justify-center items-center z-[9999]"
        onClick={onClose}
    >
      <div
        className="relative max-w-[90%] max-h-[80vh] p-2 bg-purple-400 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-purple-400 bg-opacity-90 flex items-center justify-center z-10">
            <Cargando />
          </div>
        )}
        <img
          src={`https://image.tmdb.org/t/p/original${src}`}
          alt="Imagen ampliada"
          className="max-h-[75vh] w-auto object-contain rounded"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};

export default ModalImagen;