const db = require('../config/db');

exports.createUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: 'All fields are required' });

  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({ message: 'User created', userId: result.insertId });
  });
};
