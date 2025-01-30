import express from 'express';
import consolidate from 'consolidate';
import { getIPInfo } from './utils/ipInfo.js';
import { initI18n } from './utils/i18n.js';
import { generateHomeViewData, generatePPViewData } from './utils/viewData.js';

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

app.get('/', async (req, res) => {
    const ip = req.ip;
    getIPInfo((info) => {
        info = JSON.parse(info);

        var viewdata = generateHomeViewData(req.lang, ip, info);

        res.render('index', viewdata);
    }, ip)
});

app.get('/en', async (req, res) => {
    const ip = req.ip;
    getIPInfo((info) => {
        info = JSON.parse(info);

        var viewdata = generateHomeViewData(req.lang, ip, info);

        res.render('index', viewdata);
    }, ip)
});

app.get('/politica-de-privacidade', async (req, res) => {
    setTimeout(() => {
        var viewdata = generatePPViewData(req.lang);

        res.render('privacy-policy', viewdata);
    }, 300);
});

app.get('/en/privacy-policy', async (req, res) => {
    setTimeout(() => {
        var viewdata = generatePPViewData(req.lang);

        res.render('privacy-policy', viewdata);
    }, 300);
});

app.listen(3001, () => console.log(`Server is listening on port 3001`));
