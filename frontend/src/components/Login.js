import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      // Send the email to the backend to verify if it exists
      const response = await axios.post('http://localhost:5000/api/login', { email });

      // If email is valid, allow access and save the email in localStorage
      if (response.status === 200) {
        localStorage.setItem('userEmail', response.data.email); // Save email
        navigate('/'); // Redirect to homepage or dashboard
      }
    } catch (err) {
      // If email not found, show message to fill in customer details
      setError('Email not found. Please fill the customer details form.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
