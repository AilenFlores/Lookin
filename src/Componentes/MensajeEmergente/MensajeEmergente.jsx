import React, { useEffect, useState } from 'react';

const MensajeEmergente = ({ mensaje, duracion = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duracion);
    return () => clearTimeout(timer);
  }, [duracion, onClose]);

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow z-[9999]">
      {mensaje}
    </div>
  );
};

export default MensajeEmergente;