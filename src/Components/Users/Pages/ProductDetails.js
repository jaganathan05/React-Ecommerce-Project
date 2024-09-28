import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ProductDetail.css';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const UserToken = useSelector(state => state.Auth.Token);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product details', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="product-detail-container">
        <div className="product-detail-image">
          <img src={product.imageurl} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <div className="product-pricing">
            <p>MRP: <span className="mrp-price">₹{product.mrpprice}</span></p>
            <p>Sale Price: <span className="sale-price">₹{product.saleprice}</span></p>
            <p>Offer: <span className="offer">{product.offer}% OFF</span></p>
          </div>
          <p>Quantity: {product.quantity}</p>
          <p className="product-description">{product.description}</p>
          
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
