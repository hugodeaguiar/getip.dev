import express from 'express';
import path from 'path';
import { initI18n } from './utils/i18n.js';
import { homeController } from './controllers/homeController.js';
import { i18nMustacheEngine } from './utils/i18nMustacheEngine.js';
import { privacyPolicyController } from './controllers/privacyPolicyController.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('trust proxy', true);

// set .html as the default extension
app.engine('html', i18nMustacheEngine);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'views', 'public')))

const languageMiddleware = (req, res, next) => {
    const lang = req.path.startsWith('/en') ? 'en' : 'pt';
    initI18n(lang);
    req.lang = lang;
    next();
};

app.use(languageMiddleware);

app.get(['/', '/en'], homeController);
app.get(['/politica-de-privacidade', '/en/privacy-policy'], privacyPolicyController);
app.use((req, res) => {
    homeController(req, res);
});

app.listen(3001, () => console.log(`Server is listening on port 3001`));
