import https from 'https';

export function getIPInfo(callback, ip) {
    const options = {
        hostname: 'ipinfo.io',
        port: 443,
        path: '/' + ip + '/?token=' + process.env.GETINFO_TOKEN,
        method: 'GET',
        timeout: 3000
    };

    const req = https.request(options, (resp) => {
        let data = '';


        resp.on('data', (chunk) => {
            data += chunk;
        });


        resp.on('end', () => {
            callback(data);
        });
    });

    req.on('timeout', () => {
        console.error('Request timed out');
        req.abort();
    });

    req.on('error', (err) => {
        console.error("Error: " + err.message);
    });

    req.end();
}
