import React from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';

const InfoItem = ({ label, value }) => (
  <div className="flex items-center gap-2">
    <Subtitulo texto={label} className="font-bold" />
    <Subtitulo texto={value} className="shadow-[0_4px_05px_rgba(0,0,0,0.5)] bg-purple-200 px-3 py-1 rounded-full text-sm" />
  </div>
);

export default InfoItem;