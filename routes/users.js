var express = require('express');
var router = express.Router();
const userController = require('../controllers/userControllers');

router.post('/flipkart/mobile', userController.fetchData); 

module.exports = router;
