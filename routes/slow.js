
const express = require('express');

const sleep = require('../services/sleep');

const router = express.Router();
const cache = require('express-redis-cache')();
router.route('/')

  .get(cache.route(),(req, res, next) => {
    return sleep(5000)
      .then(_ => res.render('api/index', (err, html) => {
        res.send(html);
      }));
  });

module.exports = router;
