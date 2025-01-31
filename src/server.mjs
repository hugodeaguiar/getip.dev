import express from 'express';
import path from 'path';
import { i18n } from './utils/i18n.js';
import { homeController } from './controllers/homeController.js';
import { i18nMustacheEngine } from './utils/i18nMustacheEngine.js';
import { privacyPolicyController } from './controllers/privacyPolicyController.js';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('trust proxy', true);

// set .html as the default extension
app.engine('html', i18nMustacheEngine);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views', 'public')))
app.use((req, res, next) => {
    let lang = 'pt_BR';
    if (req.cookies && req.cookies.selectedLanguage) {
        lang = req.cookies.selectedLanguage;
    } else if (req.path.startsWith('/en')) {
        lang = 'en_US';
    } else if (req.path.startsWith('/pt')) {
        lang = 'pt_BR';
    } else if (req.path.startsWith('/es')) {
        lang = 'es_ES';
    }
    i18n.changeLanguage(lang, (err) => {
        if (err) {
            console.error('Error setting language', err);
        }
        next();
    });
});

app.get(['/', '/en', '/es'], homeController);
app.get(['/politica-de-privacidade', '/en/privacy-policy', '/es/politica-de-privacidad'], privacyPolicyController);
app.use((req, res) => {
    homeController(req, res);
});

app.listen(3001, () => console.log(`Server is listening on port 3001`));
