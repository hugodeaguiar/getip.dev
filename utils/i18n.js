import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';

export function initI18n(lang) {
    i18next
        .use(Backend)
        .init({
            lng: lang,
            ignoreRoutes: ['images/', 'public/', 'css/', 'js/'],
            backend: {
                loadPath: path.join(process.cwd(), 'locales', '{{lng}}', '{{ns}}.json'),
            },
            fallbackLng: 'en',
            preload: ['en', 'pt'],
            lowerCaseLng: true,
            debug: false
        });
}
