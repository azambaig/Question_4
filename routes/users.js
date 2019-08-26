var express = require('express');
var router = express.Router();
const rp = require('request-promise');
const $ = require('cheerio');

router.post('/flipkart/mobile', function (req, res, next) {
  const url = req.body.url;
  rp(url)
    .then(function (html) {
      res.send($('._3e7xtJ', html).text());
    })
    .catch(function (err) {
      res.status(301).send(err);
    });
});

module.exports = router;
