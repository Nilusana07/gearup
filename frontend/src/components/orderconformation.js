import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div>
      <h2>🛍️ Product List</h2>
      <ul>
        {products.map(prod => (
          <li key={prod.id}>{prod.name} - ${prod.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
