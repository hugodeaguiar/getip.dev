import https from 'https';

export function getIPInfo(callback, ip) {
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
