const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
} = require('../controllers/cartController');

router.get('/:userId', getCart);           // GET /api/cart/:userId
router.post('/', addToCart);               // POST /api/cart
router.put('/:id', updateCartItem);        // PUT /api/cart/:id
router.delete('/:id', removeCartItem);     // DELETE /api/cart/:id

module.exports = router;
