import https from 'https';

export function getIPInfo(callback, ip) {
    const getIPData = (version) => {
        return new Promise((resolve, reject) => {
            const path = version === 'ipv6' ? `/${ip}/json?token=${process.env.GETINFO_TOKEN}` : `/${ip}/?token=${process.env.GETINFO_TOKEN}`;
            console.log(path)
            const options = {
                hostname: 'ipinfo.io',
                port: 443,
                path: path,
                method: 'GET',
                timeout: 3000
            };

            const req = https.request(options, (resp) => {
                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });


                resp.on('end', () => {
                    resolve(data);
                });
            });

            req.on('timeout', () => {
                console.error('Request timed out');
                req.abort();
                reject(new Error('Request timed out'));
            });

            req.on('error', (err) => {
                console.error("Error: " + err.message);
                reject(err);
            });

            req.end();
        });
    };

    Promise.all([getIPData('ipv4'), getIPData('ipv6')])
        .then(([ipv4Data, ipv6Data]) => {
            const ipInfo = ipv4Data ? ipv4Data : ipv6Data;
            callback(ipInfo);
        })
        .catch((err) => {
            console.error("Error: " + err.message);
            callback(null, err);
        });
}
