import React, { useState } from 'react';
import ProductList from './ProductList';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const HomePage = () => {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;

    // Validation for name (Only text allowed)
    const namePattern = /^[A-Za-z\s]+$/; // Only alphabetic characters and spaces
    if (!name || !namePattern.test(name)) {
      setError('Please enter a valid name (only letters and spaces are allowed).');
      return;
    }

    // Validation for email
    if (!email) {
      setError('Email is required.');
      return;
    }

    // Validate email format using regex
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError('Invalid email format. Please recheck your email.');
      return;
    }

    setError(''); // Reset any previous error
    setCustomerDetails({ name, email });
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Welcome to GearUp - Online Tech Store</h1>
        <button className="top-right-btn" onClick={handleLoginRedirect}>Login</button>
      </header>

      {!customerDetails ? (
        <div className="customer-details">
          <h2>Enter Your Details</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              required
            />
            <br /><br />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
            <br /><br />
            <button type="submit">Submit</button>
          </form>
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
        </div>
      ) : (
        <div className="products-list">
          <h2>Products for Sale</h2>
          {/* Pass customer email as userId to ProductList */}
          <ProductList userId={customerDetails.email} />
        </div>
      )}
    </div>
  );
};

export default HomePage;



/*import React, { useState } from 'react';
import ProductList from './ProductList'; // Product list component
import Cart from './Cart'; // Cart component

const HomePage = () => {
  const [customerDetails, setCustomerDetails] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;

    setCustomerDetails({ name, email });
  };

  return (
    <div className="container">
      <header>
        <h1>Welcome to GearUp - Online Tech Store</h1>
      </header>

      {!customerDetails ? (
        <div className="customer-details">
          <h2>Enter Your Details</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name" required />
            <br /><br />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email" required />
            <br /><br />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div className="products-list">
          <h2>Products for Sale</h2>
          <ProductList userId={customerDetails.email} />
        </div>
      )}

      <div className="cart-section">
        <Cart customerId={customerDetails ? customerDetails.email : null} />
      </div>
    </div>
  );
};

export default HomePage;
*/