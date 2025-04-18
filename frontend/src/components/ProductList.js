import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // Add cart state

  // Fetch products from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  // Fetch cart from backend when the component mounts
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/cart/${userId}`)
        .then(res => setCart(res.data))
        .catch(err => console.error('Error fetching cart:', err));
    }
  }, [userId]);

  // Function to add a product to the cart
  const addToCart = async (productId) => {
    try {
      // Add to cart in backend
      await axios.post('http://localhost:5000/api/cart', {
        userId,
        productId,
        quantity: 1,
      });

      // Update cart state to reflect added item
      const addedProduct = products.find(p => p.id === productId);
      setCart(prevCart => {
        const existingProduct = prevCart.find(item => item.id === productId);
        if (existingProduct) {
          return prevCart.map(item => 
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevCart, { ...addedProduct, quantity: 1 }];
        }
      });

      alert('Item added to cart!');
    } catch (err) {
      console.error('Add to cart failed:', err);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <div className="products-list">
        {products.map(p => (
          <div key={p.id} className="product-card">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>Price: ${p.price}</p>
            <button onClick={() => addToCart(p.id)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Render Cart */}
      <h3>Shopping Cart</h3>
      <div className="cart">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <h4>{item.name}</h4>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;


/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ userId }) => {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  // Function to add a product to the cart
  const addToCart = async (productId) => {
    try {
      await axios.post('http://localhost:5000/api/cart', {
        userId,
        productId,
        quantity: 1,
      });
      alert('Item added to cart!');
    } catch (err) {
      console.error('Add to cart failed:', err);
    }
  };

  return (
    <div>
      {products.map(p => (
        <div key={p.id} className="product-card">
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>Price: ${p.price}</p>
          <button onClick={() => addToCart(p.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;




/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ userId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post('http://localhost:5000/api/cart', {
        userId,
        productId,
        quantity: 1
      });
      alert('Item added to cart!');
    } catch (err) {
      console.error('Add to cart failed:', err);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p.id}>
          <strong>{p.name}</strong> - ${p.price}
          <button onClick={() => addToCart(p.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;*/
