
const express = require('express');

const sleep = require('../services/sleep');

const router = express.Router();
router.route('/')

  .get((req, res, next) => {
    return sleep(5000)
      .then(_ => res.render('api/index', (err, html) => {
          res.setCache(`${req.originalUrl}`, html);
          res.send(html + `<p id="counter">SiteVisits: ${res.getCounter}</p>`);
      }));
  });

module.exports = router;
