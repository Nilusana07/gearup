const db = require('../config/db');

// GET cart for user
exports.getCart = (req, res) => {
  const userId = req.params.userId;
  const query = `
    SELECT ci.id, p.name, ci.quantity, p.price
    FROM cart_items ci
    JOIN carts c ON ci.cart_id = c.id
    JOIN products p ON ci.product_id = p.id
    WHERE c.user_id = ?
  `;
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Add item to cart
exports.addToCart = (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity)
    return res.status(400).json({ error: 'Missing fields' });

  db.query('SELECT id FROM carts WHERE user_id = ?', [userId], (err, cartResults) => {
    if (err) return res.status(500).json({ error: err.message });

    let cartId = cartResults[0]?.id;

    const proceed = () => {
      const insertQuery = 'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)';
      db.query(insertQuery, [cartId, productId, quantity], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Item added to cart' });
      });
    };

    if (cartId) {
      proceed();
    } else {
      db.query('INSERT INTO carts (user_id) VALUES (?)', [userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        cartId = result.insertId;
        proceed();
      });
    }
  });
};

// Update cart item
exports.updateCartItem = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  db.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Cart item updated' });
  });
};

// Delete cart item
exports.removeCartItem = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM cart_items WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Cart item removed' });
  });
};
