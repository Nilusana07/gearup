import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCustomer } from '../services/api'; // Make sure this API function exists

function CustomerForm() {
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await createCustomer(form);
    if (res.customerId) {
      localStorage.setItem('customerId', res.customerId);
      navigate('/products');
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="customer-form-container">
      <h2>Enter Your Details</h2>
      <form onSubmit={handleSubmit} className="customer-form">
        <label htmlFor="name">Name:</label>
        <input 
          name="name" 
          placeholder="Enter your name" 
          onChange={handleChange} 
          value={form.name}
          required 
        />
        
        <label htmlFor="email">Email:</label>
        <input 
          name="email" 
          placeholder="Enter your email" 
          onChange={handleChange} 
          value={form.email}
          required 
        />
        
        <label htmlFor="address">Address:</label>
        <input 
          name="address" 
          placeholder="Enter your address" 
          onChange={handleChange} 
          value={form.address}
          required 
        />

        <button type="submit" className="submit-btn">Continue</button>
      </form>
    </div>
  );
}

export default CustomerForm;
