import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
//import Form from 'react-bootstrap/Form';
import './ProductList.css'; 
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Cartactions , updateCart } from '../../../Store/Slices/Cart';


function ProductList() {
  const history = useHistory();
  const dispatch = useDispatch()
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const selectedSubcategory = useSelector(state => state.Catagory.subcategory);
  const UserToken = useSelector(state => state.Auth.Token);
  const cartitems = useSelector(state => state.Cart.CartItems);
 
  
  const handleCardClick = (productId) => {
    history.push(`/product/${productId}`);
  };

  const filterProducts = useCallback((subcategory) => {
    
    if (subcategory) {
      setFilteredProducts(products.filter(product => product.subcategory === subcategory));
    } else {
      setFilteredProducts(products);
    }
  },[products]);

  useEffect(() => {
    const fetchProducts = async () => { 
      try {
        const response = await axios.get('http://localhost:4000/products', {
          headers: {
            Authorization: UserToken
          }
        });
      
        setProducts(response.data);
        setFilteredProducts(response.data);
       
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();
  }, [UserToken]);

  function additemtocart(product){
dispatch(Cartactions.addCartItems(product))
dispatch(updateCart({cartitems, UserToken}))


  }

  useEffect(() => {
    
    filterProducts(selectedSubcategory);
  }, [selectedSubcategory,filterProducts]);

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
              <Button variant="secondary" onClick={()=>{additemtocart(product)}}>Add To Cart</Button>
              
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
