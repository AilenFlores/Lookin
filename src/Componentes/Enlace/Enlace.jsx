import React from 'react';
import { Link } from 'react-router-dom';

const Enlace = ({ to, children, className = '' }) => {
  return (
    <Link
      to={to}
      className={`hover:text-purple-800 transition duration-200 ${className}`}
    >
      {children}
    </Link>
  );
};

export default Enlace;
