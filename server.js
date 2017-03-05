const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
// const cache = require('express-redis-cache')({expire: 60}); //short way
const cache = require('./cache.js');

const { slow } = require('./routes');

const app = express();
const PORT = 8080;
let counter = 0;

app.engine('.hbs', handlebars({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use(bodyParser.json());
// app.use(cache.route())//short way
app.use(cache);
app.use('/slow', slow);

app.get('/', (req, res) => {
  res.render('index', (err, html) => {
    res.setCache(`${req.originalUrl}`, html);
    res.send(html);
  });
});

app.listen(PORT, () => {
  process.stdout.write(`server listening on port ${PORT}`);
});
