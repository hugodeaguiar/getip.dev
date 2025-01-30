import express from 'express';
import consolidate from 'consolidate';
import { homeController } from './controllers/homeController.js';
import { privacyPolicyController } from './controllers/privacyPolicyController.js';

const app = express();
app.set('trust proxy', true);

// assign the mustache engine to .html files
app.engine('html', consolidate.mustache);

// set .html as the default extension
app.set('view engine', 'html');

app.set('views', './views');
app.use(express.static('views/public'))

const languageMiddleware = (req, res, next) => {
    const lang = req.path.startsWith('/en') ? 'en' : 'pt';
    initI18n(lang);
    req.lang = lang;
    next();
};

app.use(languageMiddleware);

app.get(['/', '/en'], homeController);
app.get(['/politica-de-privacidade', '/en/privacy-policy'], privacyPolicyController);

app.listen(3001, () => console.log(`Server is listening on port 3001`));
