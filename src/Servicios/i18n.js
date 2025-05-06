import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importa tus traducciones
import cabeceraEN from "../locales/en/cabecera.json";
import cabeceraES from "../locales/es/cabecera.json";
import inicioEN from "../locales/en/inicio.json";
import inicioES from "../locales/es/inicio.json";
import pieES from "../locales/es/pie.json";
import pieEN from "../locales/en/pie.json";
import catalogoEN from "../locales/en/catalogo.json";
import catalogoES from "../locales/es/catalogo.json";
import favoritosEN from "../locales/en/favoritos.json";
import favoritosES from "../locales/es/favoritos.json";
import detalleES from "../locales/es/detalle.json";
import detalleEN from "../locales/en/detalle.json";
import variosEN from "../locales/en/varios.json";
import variosES from "../locales/es/varios.json";
import alertaES from "../locales/es/alerta.json";
import alertaEN from "../locales/en/alerta.json";
import tarjetaES from "../locales/es/tarjeta.json";
import tarjetaEN from "../locales/en/tarjeta.json";
// Idioma guardado o 'es' por defecto
const savedLanguage = localStorage.getItem("language") || "es";

const resources = {
    en: {
      cabecera: cabeceraEN,
      inicio: inicioEN,
      pie: pieEN,
      catalogo: catalogoEN,
      favoritos: favoritosEN,
      detalle: detalleEN,
      varios: variosEN,
      alerta: alertaEN,
      tarjeta: tarjetaEN
    },
    es: {
      cabecera: cabeceraES,
      inicio: inicioES,
      pie: pieES,
      catalogo: catalogoES,
      favoritos: favoritosES,
      detalle: detalleES,
      varios: variosES,
      alerta: alertaES,
      tarjeta: tarjetaES
    },
  }; 

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,             
    fallbackLng: "es",
    ns: ['cabecera', 'inicio', 'pie', 'catalogo','detalle','varios','alerta','tarjeta'],     
    defaultNS: 'inicio',                   
    interpolation: {
      escapeValue: false,
    },
  });

// Guardá el idioma cada vez que cambie
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export default i18n;
