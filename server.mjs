import express from 'express';
import consolidate from 'consolidate';
import https from 'https';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';

const app = express();
app.set('trust proxy', true);

// assign the mustache engine to .html files
app.engine('html', consolidate.mustache);

// set .html as the default extension 
app.set('view engine', 'html');

app.set('views', './views');
app.use(express.static('views/public'))

function getIPInfo(callback, ip) {
    const options = {
        hostname: 'ipinfo.io',
        port: 443,
        path: '/' + ip + '/?token=' + process.env.GETINFO_TOKEN,
        method: 'GET',
        timeout: 3000 // Timeout in milliseconds (3 seconds)
    };

    const req = https.request(options, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            callback(data);
        });
    });

    req.on('timeout', () => {
        console.error('Request timed out');
        req.abort(); // Aborts the request
    });

    req.on('error', (err) => {
        console.error("Error: " + err.message);
    });

    req.end();
}

function initI18n(lang) {
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

function generateHomeViewData(lang, ip, info) {
    return { 
        'title' : i18next.t('title'), 
        'ip': ip, 
        'ipinfo' : info,
        'home_description': i18next.t('home-description'),
        'html_lang': lang == 'en' ? 'en' : 'pt_BR',
        'your_current_ip': i18next.t('your-current-ip'),
        'city': i18next.t('city'),
        'region': i18next.t('region'),
        'country': i18next.t('country'),
        'provider': i18next.t('provider'),
        'cookie_consent': i18next.t('cookie-consent'),
        'see_more': i18next.t('see-more')
    };
}

function generatePPViewData(lang) {
    return { 
        'title' : i18next.t('title-privacy'),
        'html_lang': lang == 'en' ? 'en' : 'pt_BR',
        'cookie_consent': i18next.t('cookie-consent'),
        'see_more': i18next.t('see-more'),
        'pp_info': i18next.t('pp-info'),
        'pp_info_1': i18next.t('pp-info-1'),
        'pp_info_1_1': i18next.t('pp-info-1-1'),
        'pp_info_1_2': i18next.t('pp-info-1-2'),
        'pp_info_1_3': i18next.t('pp-info-1-3'),
        'pp_use': i18next.t('pp-use'),
        'pp_use_1': i18next.t('pp-use-1'),
        'pp_use_1_1': i18next.t('pp-use-1-1'),
        'pp_use_1_2': i18next.t('pp-use-1-2'),
        'pp_use_1_3': i18next.t('pp-use-1-3'),
        'pp_share': i18next.t('pp-share'),
        'pp_share_description': i18next.t('pp-share-description'),
        'pp_cookies': i18next.t('pp-cookies'),
        'pp_cookies_description': i18next.t('pp-cookies-description'),
        'pp_security': i18next.t('pp-security'),
        'pp_security_description': i18next.t('pp-security-description'),
        'pp_updates': i18next.t('pp-updates'),
        'pp_updates_description': i18next.t('pp-updates-description'),
        'pp_contact': i18next.t('pp-contact'),
        'pp_contact_description': i18next.t('pp-contact-description')
    };
}


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

        var viewdata = generateHomeViewData('pt', ip, info);

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
        var viewdata = generatePPViewData('pt');

        res.render('privacy-policy', viewdata);
    }, 300);
});

app.listen(3001, () => console.log(`Server is listening on port 3001`));
