import i18next from 'i18next';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadAllCsvTranslations } from './translationLoader.js';
import { debug } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resources = loadAllCsvTranslations(path.join(path.dirname(__dirname), 'locales'));
export const i18n = i18next.createInstance();
i18n.init({
    resources,
    fallbackLng: 'en_US',
    defaultNS: 'translation',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
