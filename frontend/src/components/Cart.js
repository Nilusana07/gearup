import React, { useEffect, useState } from 'react';
import { getCart, updateCartItem, removeCartItem } from '../services/api'; // Assuming you have API functions for cart

function Cart({ customerId }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to handle errors

  // Fetch cart items when customerId changes or on component mount
  useEffect(() => {
    if (customerId) {
      setLoading(true);
      getCart(customerId)
        .then(setCartItems)
        .catch(err => setError('Failed to load cart items. Please try again later.'))
        .finally(() => setLoading(false));
    }
  }, [customerId]);

  // Update item quantity
  const handleUpdate = (id, quantity) => {
    setLoading(true);
    updateCartItem(id, quantity)
      .then(() => getCart(customerId).then(setCartItems))
      .catch(err => setError('Failed to update item.'));
  };

  // Remove item from cart
  const handleRemove = (id) => {
    setLoading(true);
    removeCartItem(id)
      .then(() => getCart(customerId).then(setCartItems))
      .catch(err => setError('Failed to remove item.'));
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <p>{item.product_name} - Qty: {item.quantity}</p>
            <div className="cart-item-actions">
              <button 
                onClick={() => handleUpdate(item.id, item.quantity + 1)} 
                className="update-btn"
              >
                +
              </button>
              <button 
                onClick={() => handleUpdate(item.id, item.quantity - 1)} 
                disabled={item.quantity <= 1} 
                className="update-btn"
              >
                -
              </button>
              <button 
                onClick={() => handleRemove(item.id)} 
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;




/*import React, { useEffect, useState } from 'react';
import { getCart, updateCartItem, removeCartItem } from '../services/api'; // Assuming you have API functions for cart

function Cart({ customerId }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (customerId) {
      getCart(customerId).then(setCartItems);
    }
  }, [customerId]);

  const handleUpdate = (id, quantity) => {
    updateCartItem(id, quantity).then(() => getCart(customerId).then(setCartItems));
  };

  const handleRemove = (id) => {
    removeCartItem(id).then(() => getCart(customerId).then(setCartItems));
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <p>{item.product_name} - Qty: {item.quantity}</p>
            <div className="cart-item-actions">
              <button onClick={() => handleUpdate(item.id, item.quantity + 1)} className="update-btn">+</button>
              <button onClick={() => handleUpdate(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="update-btn">-</button>
              <button onClick={() => handleRemove(item.id)} className="remove-btn">Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;




/*import React, { useEffect, useState } from 'react';
import { getCart, updateCartItem, removeCartItem } from '../services/api';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const customerId = localStorage.getItem('customerId');

  const loadCart = () => getCart(customerId).then(setCartItems);

  useEffect(loadCart, []);

  const handleUpdate = (id, quantity) => {
    updateCartItem(id, quantity).then(loadCart);
  };

  const handleRemove = (id) => {
    removeCartItem(id).then(loadCart);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <p>{item.product_name} - Qty: {item.quantity}</p>
            <div className="cart-item-actions">
              <button 
                onClick={() => handleUpdate(item.id, item.quantity + 1)} 
                className="update-btn">
                +
              </button>
              <button 
                onClick={() => handleUpdate(item.id, item.quantity - 1)} 
                disabled={item.quantity <= 1} 
                className="update-btn">
                -
              </button>
              <button 
                onClick={() => handleRemove(item.id)} 
                className="remove-btn">
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;*/
