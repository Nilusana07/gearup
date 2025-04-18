const BASE_URL = 'http://localhost:5000/api';

export const createCustomer = async (data) =>
  (await fetch(`${BASE_URL}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })).json();

export const getProducts = async () =>
  (await fetch(`${BASE_URL}/products`)).json();

export const addToCart = async (customerId, productId, quantity) =>
  (await fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId, productId, quantity })
  })).json();

export const getCart = async (customerId) =>
  (await fetch(`${BASE_URL}/cart/${customerId}`)).json();

export const updateCartItem = async (id, quantity) =>
  (await fetch(`${BASE_URL}/cart/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity })
  })).json();

export const removeCartItem = async (id) =>
  (await fetch(`${BASE_URL}/cart/${id}`, {
    method: 'DELETE'
  })).json();

export const placeOrder = async (customerId, delivery_address) =>
  (await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId, delivery_address, items: [] }) // Fill items in backend if needed
  })).json();
