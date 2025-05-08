import React, { useState, useEffect } from 'react';
import Titulo from '../Titulo/Titulo';
import ModalImagen from '../ModalImagen/ModalImagen';
import { useTranslation } from 'react-i18next';

const SeccionGaleriaImagenes = ({ posters = [], backdrops = [] }) => {
  const { t } = useTranslation("detalle");
  const imagenes = [
    ...posters.map(img => ({ ...img, type: 'poster' })),
    ...backdrops.map(img => ({ ...img, type: 'backdrop' }))
  ];
  const [modalImg, setModalImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (modalImg) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [modalImg]);

  const cerrarModal = () => {
    setModalImg(null);
    setIsLoading(false);
  };

  if (imagenes.length === 0) return null;

  return (
    <div id="galeria" className="py-8 scroll-mt-[110px]">
      <Titulo
        texto={t("detalle.galeria")}
        className="text-3xl md:text-4xl font-semibold text-black pl-6 border-l-4 border-purple-600 mb-4 text-left"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
        {imagenes.map((img, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <img
              src={`https://image.tmdb.org/t/p/w300${img.file_path}`}
              alt={`${img.type} ${idx + 1}`}
              className="w-full h-32 object-cover rounded-lg transition-transform duration-300 hover:scale-125 cursor-zoom-in"
              onClick={() => {
                setModalImg(img.file_path);
                setIsLoading(true);
              }}
            />
          </div>
        ))}
      </div>
      {modalImg && (
        <ModalImagen
          src={modalImg}
          onClose={cerrarModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
};

export default SeccionGaleriaImagenes;