var express = require('express');
var router = express.Router();
const userController = require('../controllers/scrapControllers');

router.post('/flipkart/mobile', userController.fetchData);

module.exports = router;
