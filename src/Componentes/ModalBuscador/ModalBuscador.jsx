import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ModalBuscador = ({ visible, onClose, ignoreRef }) => {
  const [termino, setTermino] = useState('');
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const {t } = useTranslation("varios");

  useEffect(() => {
    if (!visible) setTermino('');
  }, [visible]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedOutsideModal = modalRef.current && !modalRef.current.contains(e.target);
      const clickedIgnored = ignoreRef?.current && ignoreRef.current.contains(e.target);
      
      if (clickedOutsideModal && !clickedIgnored) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [visible, onClose, ignoreRef]);

  const manejarBusqueda = (e) => {
    e.preventDefault();
    if (termino.trim()) {
      navigate(`/buscar/${encodeURIComponent(termino.trim())}`);
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-[rgba(229,231,235,0.8)] z-[9997]" />
      <div className="fixed top-20 left-0 w-full z-[9998] bg-white border-b border-gray-200 shadow-md">
        <form
          onSubmit={manejarBusqueda}
          ref={modalRef}
          className="max-w-screen-xl mx-auto px-4 py-3"
        >
          <input
            type="text"
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
            placeholder={t("buscador.mensajePlaceholder")}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg shadow-sm"
            autoFocus
          />
        </form>
      </div>
    </>
  );
};

export default ModalBuscador;