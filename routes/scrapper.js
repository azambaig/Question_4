var express = require('express');
var router = express.Router();
const scrapController = require('../controllers/scrapControllers');

router.post('/flipkart/mobile', scrapController.fetchMobiles);

router.post('/snapdeal/mobile', scrapController.fetchShirts);

module.exports = router;
