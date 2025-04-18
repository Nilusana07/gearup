const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/orderController');

router.post('/', placeOrder); // POST /api/orders

module.exports = router;
