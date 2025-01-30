import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function initI18n(lang) {
    i18next
        .use(Backend)
        .init({
            lng: lang,
            ignoreRoutes: ['images/', 'public/', 'css/', 'js/'],
            backend: {
                loadPath: path.join(path.dirname(__dirname), 'locales', '{{lng}}', '{{ns}}.json'),
            },
            fallbackLng: 'en',
            preload: ['en', 'pt'],
            lowerCaseLng: true,
            debug: false
        });
}
