import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './ProductList.css'; 
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function AdminProductList() {
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const selectedSubcategory = useSelector(state => state.Catagory.subcategory);
  const AdminToken = useSelector(state => state.AdminAuth.Token);

  const handleCardClick = (productId) => {
    history.push(`/admin/product/${productId}`);
  };

  const filterProducts = useCallback((subcategory) => {
    if (subcategory) {
      setFilteredProducts(products.filter(product => product.subcategory === subcategory));
    } else {
      setFilteredProducts(products);
    }
  }, [products]);

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

  useEffect(() => {
    filterProducts(selectedSubcategory);
  }, [selectedSubcategory, filterProducts]);

  return (
    <div>
     
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
              <Button variant="danger" onClick={() => handleDeleteClick(product._id)}>Delete</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AdminProductList;
