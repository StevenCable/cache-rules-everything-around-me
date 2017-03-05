const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
// const cache = require('express-redis-cache')({expire: 60}); //short way
let redis = require('redis');
let client = redis.createClient(); 
const cache = require('./cache');
// const counter = require('./counter');

const { slow } = require('./routes');

const app = express();
const PORT = 8080;

app.engine('.hbs', handlebars({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use(bodyParser.json());
// app.use(cache.route())//short way

app.use((req,res,next) => {
  client.incr(`${req.originalUrl}_counter`);
  client.get(`${req.originalUrl}_counter`, (err,data) =>{
    res.getCounter = data;
  });
  next();
});

app.use(cache);
app.use('/slow', slow);

app.get('/', (req, res) => {
  res.render('index', (err, html) => {
    res.setCache(`${req.originalUrl}`, html);
    res.send(html + `<p id="counter">Site Visits: ${res.getCounter}</p>`);
  });
});

app.listen(PORT, () => {
  process.stdout.write(`server listening on port ${PORT}`);
});
