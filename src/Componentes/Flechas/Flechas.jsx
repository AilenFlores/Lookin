import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Boton from '../Boton/Boton';

const Flechas = ({ Desplazar, size }) => {
  return (
    <>
      <Boton
        texto={<FaChevronLeft size={size} />}
        onClick={() => Desplazar('izquierda')}
        className="!px-2 bg-purple-800 hover:bg-gray-700 !rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] absolute top-1/2 left-2 -translate-y-1/2 text-white z-[100]"
      />

      <Boton
        texto={<FaChevronRight size={size} />}
        onClick={() => Desplazar('derecha')}
        className="!px-2 bg-purple-800 hover:bg-gray-700 !rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] absolute top-1/2 right-2 -translate-y-1/2 text-white z-[100]"
      />
    </>
  );
};

export default Flechas;
