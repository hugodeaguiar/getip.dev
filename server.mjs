import express from 'express';
import consolidate from 'consolidate';

const app = express();

// assign the mustache engine to .html files
app.engine('html', consolidate.mustache);

// set .html as the default extension 
app.set('view engine', 'html');

app.set('views', './views');
app.use(express.static('views/public'))

app.get('/', async (req, res) => {
    const ip = req.ip;

    var viewdata = { 'title' : 'getip.dev', 'ip': ip };

    res.render('index', viewdata);
});

app.listen(3001, () => console.log(`Server is listening on port 3001`));
