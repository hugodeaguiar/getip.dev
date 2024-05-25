import express from 'express';
import { publicIpv4, publicIpv6 } from 'public-ip';
import {internalIpV4} from 'internal-ip';

import consolidate from 'consolidate';

const app = express();

// assign the mustache engine to .html files
app.engine('html', consolidate.mustache);

// set .html as the default extension 
app.set('view engine', 'html');

app.set('views', './views');
app.use(express.static('views/public'))

app.get('/', async (req, res) => {
    const ipv6 = await publicIpv6();
    const ipv4 = await publicIpv4();
    const internalIpv4 = await internalIpV4();

    var viewdata = { 'title' : 'getip.dev', 'ipv6': ipv6, 'ipv4': ipv4, 'internalIpv4': internalIpv4};

    res.render('index', viewdata);
});

app.listen(3001, () => console.log(`Server is listening on port 3001`));
