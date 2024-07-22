import express from 'express';
import consolidate from 'consolidate';
import https from 'https';

const app = express();

app.set('trust proxy', true);

// assign the mustache engine to .html files
app.engine('html', consolidate.mustache);

// set .html as the default extension 
app.set('view engine', 'html');

app.set('views', './views');
app.use(express.static('views/public'))

function getIPV6(callback) {
    const options = {
        hostname: 'ipv6.icanhazip.com',
        port: 443,
        path: '/',
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
            callback(data.trim());
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
    console.log(req);
    const ip = req.ip;
    getIPV6((ipv6) => {
        ipv6 = ipv6 ? ipv6 : "Não encontrado."
        var viewdata = { 'title' : 'GetIP.dev - Qual é meu IP?', 'ip': ip, 'ipv6': ipv6 };

        res.render('index', viewdata);
    })


});

app.get('/qual-e-meu-ip', async (req, res) => {
    const ip = req.ip;

    var viewdata = { 'title' : 'GetIP.dev - Qual é meu IP?', 'ip': ip };

    res.render('index', viewdata);
});

app.listen(3001, () => console.log(`Server is listening on port 3001`));
