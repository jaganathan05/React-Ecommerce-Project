import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import NavBar from '../Layout/Navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './ProductList.css'; 
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function AdminProductList() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const AdminToken = useSelector(state => state.AdminAuth.Token);

  const categories = {
    "Top Wear": ["T-Shirts", "Shirts"],
    "Bottom Wear": ["Jeans", "Trackpants"],
    "Accessories": ["Bags", "Belts", "Watches"],
    "Inner & Sleep Wear": ["Nightwear", "Underwear"]
  };

  const handleCardClick = (productId) => {
    history.push(`/admin/product/${productId}`);
  };

  const handleEditClick = (productId) => {
    history.push(`/admin/edit-product/${productId}`);
  };

  const handleDeleteClick = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:4000/admin/product/${productId}`, {
          headers: {
            Authorization: AdminToken
          }
        });
        if (response) {
          setProducts(products.filter(product => product._id !== productId));
          setFilteredProducts(filteredProducts.filter(product => product._id !== productId));
        }
      } catch (error) {
        console.error('Failed to delete product', error);
      }
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory('');
    filterProducts(e.target.value, '');
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
    filterProducts(selectedCategory, e.target.value);
  };

  const filterProducts = (category, subcategory) => {
    let filtered = products;
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    if (subcategory) {
      filtered = filtered.filter(product => product.subcategory === subcategory);
    }
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin/products', {
          headers: {
            Authorization: AdminToken
          }
        });
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();
  }, [AdminToken]);

  return (
    <div>
      <NavBar />
      <h2>All Products</h2>
      <div className="filter-container">
        <Form.Select value={selectedCategory} onChange={handleCategoryChange} className="filter-select">
          <option value="">Select Category</option>
          {Object.keys(categories).map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </Form.Select>
        {selectedCategory && (
          <Form.Select value={selectedSubcategory} onChange={handleSubcategoryChange} className="filter-select">
            <option value="">Select Subcategory</option>
            {categories[selectedCategory].map((subcategory, index) => (
              <option key={index} value={subcategory}>{subcategory}</option>
            ))}
          </Form.Select>
        )}
      </div>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <Card key={product._id} style={{ width: '18rem' }} className="product-card">
            <Card.Img variant="top" src={product.imageurl} alt={product.name} onClick={() => handleCardClick(product._id)} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                <span className="sale-price">₹{product.saleprice}</span>{' '}
                <span className="mrp-price">₹{product.mrpprice}</span>{' '}
                <span className="offer">({product.offer}% OFF)</span>
              </Card.Text>
              <Button variant="secondary" onClick={() => handleEditClick(product._id)}>Edit</Button>
              <Button variant='danger' onClick={() => handleDeleteClick(product._id)}>Delete</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AdminProductList;
