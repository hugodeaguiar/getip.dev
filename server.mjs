import express from 'express';
import consolidate from 'consolidate';
import https from 'https';

const getinfo_token = "d497f952b8b33f";
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
        path: '/' + ip + '/?token=' + getinfo_token,
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


app.get('/', async (req, res) => {
    const ip = req.ip;
    getIPInfo((info) => {
        info = JSON.parse(info);

        var viewdata = { 'title' : 'GetIP.dev - Qual é meu IP?', 'ip': ip, 'ipinfo' : info};

        res.render('index', viewdata);
    }, ip)


});

app.get('/qual-e-meu-ip', async (req, res) => {
    const ip = req.ip;

    var viewdata = { 'title' : 'GetIP.dev - Qual é meu IP?', 'ip': ip };

    res.render('index', viewdata);
});

app.listen(3001, () => console.log(`Server is listening on port 3001`));
