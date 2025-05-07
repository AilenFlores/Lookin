import React from 'react';
import { useTranslation } from 'react-i18next';

const InfoBasica = ({ vote_average, runtime, release_date, first_air_date, certificacion }) => {
    const { t } = useTranslation("varios");

    const elementos = [
        <div key="voto">
            <span className="w-9 h-9 rounded-full border-2 border-yellow-500 text-yellow-500 flex items-center justify-center">
                {Math.round(vote_average * 10)}%
            </span>
        </div>,
        <span key="duracion" className="pl-1">
            {runtime ? `${runtime} min` : t("sinopsis.duracion")}
        </span>,
        <span key="anio" className="pl-1">
            {release_date?.slice(0, 4) || first_air_date?.slice(0, 4) || 'Año N/A'}
        </span>,
        certificacion && (
            <span
                key="cert"
                className="pl-1 min-w-[32px] text-center bg-purple-300 border border-gray-300 text-gray-800 px-2 py-0.5 rounded"
            >
                {certificacion}
            </span>
        )
    ].filter(Boolean);

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center text-sm font-medium text-gray-800 text-left space-y-2 sm:space-y-0 sm:gap-4">
            {elementos.map((el, index) => (
                <React.Fragment key={index}>
                    {el}
                    {index < elementos.length - 1 && (
                        <span className="hidden sm:inline text-gray-400 px-1">|</span>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default InfoBasica;