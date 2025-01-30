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

app.get('/', async (req, res) => {
    initI18n('pt');

    const ip = req.ip;
    getIPInfo((info) => {
        info = JSON.parse(info);

        var viewdata = generateHomeViewData('pt', ip, info);

        res.render('index', viewdata);
    }, ip)
});

app.get('/en', async (req, res) => {
    initI18n('en');

    const ip = req.ip;
    getIPInfo((info) => {
        info = JSON.parse(info);

        var viewdata = generateHomeViewData('en', ip, info);

        res.render('index', viewdata);
    }, ip)
});

app.get('/politica-de-privacidade', async (req, res) => {
    initI18n('pt');

    setTimeout(() => {
        var viewdata = generatePPViewData('pt');

        res.render('privacy-policy', viewdata);
    }, 300);
});

app.get('/en/privacy-policy', async (req, res) => {
    initI18n('en');

    setTimeout(() => {
        var viewdata = generatePPViewData('en');

        res.render('privacy-policy', viewdata);
    }, 300);
});

app.listen(3001, () => console.log(`Server is listening on port 3001`));
