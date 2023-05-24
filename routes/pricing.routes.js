const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricing.controller');

// POST /check-price
router.post('/check-price', pricingController.checkPrice);

module.exports = router;
