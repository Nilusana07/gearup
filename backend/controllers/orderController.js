const db = require('../config/db');

// Place order
exports.placeOrder = (req, res) => {
  const { userId, deliveryAddress, items } = req.body;

  if (!userId || !deliveryAddress || !items?.length)
    return res.status(400).json({ error: 'Missing fields' });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  db.query(
    'INSERT INTO orders (user_id, delivery_address, total_price) VALUES (?, ?, ?)',
    [userId, deliveryAddress, total],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      const orderId = result.insertId;

      const values = items.map(item => [orderId, item.productId, item.quantity]);

      db.query(
        'INSERT INTO order_items (order_id, product_id, quantity) VALUES ?',
        [values],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });

          res.status(201).json({ message: 'Order placed successfully', orderId });
        }
      );
    }
  );
};
