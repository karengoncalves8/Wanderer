import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import pt from '../locales/pt.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';

export const languagesResources = {
    en: { translation: en },
    pt: { translation: pt },
    es: { translation: es },
    fr: { translation: fr },
};

i18next.use(initReactI18next).init({
    resources: languagesResources,
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: { escapeValue: false },
});