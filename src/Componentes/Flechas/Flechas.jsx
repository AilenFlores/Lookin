import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Flechas = ({ Desplazar, size }) => {
  return (
    <>
      <button
        onClick={() => Desplazar('izquierda')}
        className=" shadow-[0_4px_20px_rgba(0,0,0,0.5)] absolute top-1/2 left-2 -translate-y-1/2 bg-purple-800 text-white p-3 rounded-full hover:bg-gray-700 z-10"
      >
        <FaChevronLeft size={size} />
      </button>
      <button
        onClick={() => Desplazar('derecha')}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-purple-800 text-white p-3 rounded-full hover:bg-gray-700 z-10"
      >
        <FaChevronRight size={size} />
      </button>
    </>
  );
};

export default Flechas;
