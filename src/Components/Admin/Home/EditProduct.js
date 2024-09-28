import React, { useRef, useState, useEffect ,useMemo} from "react";
import { Button, FloatingLabel, Form , Col , Row } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import NavBar from "../Layout/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import classes from './AddProduct.module.css';

function EditProduct() {
  const [isValidated, setValidated] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const imageUrlRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();
  const categoryRef = useRef();
  const subcategorieRef = useRef();
  const SalepriceRef = useRef();
  
  const history = useHistory();
  const AdminToken = useSelector(state=> state.AdminAuth.Token);

  const subcategoryOptions = useMemo(() => ({
    "Top Wear": ["T-Shirts", "Shirts"],
    "Bottom Wear": ["Jeans", "Trackpants"],
    "Accessories": ["Bags", "Belts", "Watches"],
    "Inner & Sleep Wear": ["Nightwear", "Underwear"]
  }), []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSubcategories(subcategoryOptions[selectedCategory] || []);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/admin/product/${productId}`, {
          headers: {
            Authorization: AdminToken
          }
        });
        const productData = response.data;
        setProduct(productData);
        setSubcategories(subcategoryOptions[productData.category] || []);
      } catch (error) {
        console.error('Failed to fetch product details', error);
      }
    };

    fetchProduct();
  }, [productId, AdminToken, subcategoryOptions]);

  const submitFormHandler = async (event) => {
    event.preventDefault();
    let formValid = true;

    const enteredName = nameRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredPrice = priceRef.current.value;
    const enteredQuantity = quantityRef.current.value;
    const enteredCategory = categoryRef.current.value;
    const enteredSubCatagory = subcategorieRef.current.value;
    const enteredSalePrice = SalepriceRef.current.value;
    const enteredImageUrl = imageUrlRef.current.value;

    if (enteredName.trim() === '') {
      alert('Enter Product Name');
      formValid = false;
    }

    if (enteredDescription.trim() === '') {
      alert('Enter Product Description');
      formValid = false;
    }

    if (enteredPrice <= 0) {
      alert('Enter a valid MRP price');
      formValid = false;
    }

    if(enteredSalePrice <=0){
      alert('Enter Product Sale Price');
      formValid = false;
    }

    if (enteredQuantity < 0) {
      alert('Enter a valid quantity');
      formValid = false;
    }

    if(enteredImageUrl.trim === ''){
      alert('Enter Product Image Url');
      formValid = false;
    }

    if(!enteredCategory){
      alert('Enter Product Catagory');
      formValid = false;
    }

    if(!enteredSubCatagory){
      alert('Enter Product sub Catagory');
      formValid = false;
    }

    if (formValid) {
      setValidated(true);
      const productData = {
        name: enteredName,
        description: enteredDescription,
        imageurl : enteredImageUrl,
        mrpprice: enteredPrice,
        saleprice : enteredSalePrice,
        offer : Math.ceil((1 - (enteredSalePrice / enteredPrice)) * 100),
        quantity: enteredQuantity,
        remainquantity : enteredQuantity,
        category: enteredCategory,
        subcategory : enteredSubCatagory
      };

      console.log(productData);

      const response = await axios.post(`http://localhost:4000/admin/edit-product/${productId}`, productData, {
        headers: {
          Authorization: AdminToken
        }
      });

      if (response) {
        alert('Product updated successfully');
        history.push('/admin/products');
      } else {
        setValidated(false);
      }
    } else {
      setValidated(false);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div> 
      <NavBar />
      <div className={classes["product-container"]}>
        <Form noValidate validated={isValidated} onSubmit={submitFormHandler} className={classes['product-box']}>
          <h2>Edit Product</h2>
          <FloatingLabel controlId="name" label='Product Name' className="mb-3">
            <Form.Control type='text' placeholder='Enter product name' required ref={nameRef} defaultValue={product.name}></Form.Control>
          </FloatingLabel>
          <FloatingLabel controlId="ImageUrl" label='Product Image' className="mb-3">
            <Form.Control type='text' placeholder='Enter product Image Url' required ref={imageUrlRef} defaultValue={product.imageurl}></Form.Control>
          </FloatingLabel>
          <FloatingLabel controlId="description" label='Product Description' className="mb-3">
            <Form.Control as="textarea" rows={3} placeholder='Enter product description' required ref={descriptionRef} defaultValue={product.description}></Form.Control>
          </FloatingLabel>
          <Row className="mb-3">
            <Col>
              <FloatingLabel controlId="price" label='Price'>
                <Form.Control type='number' placeholder='Enter product price' required ref={priceRef} defaultValue={product.mrpprice}></Form.Control>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="saleprice" label='Sale Price'>
                <Form.Control type='number' placeholder='Enter product sale price' required ref={SalepriceRef} defaultValue={product.saleprice}></Form.Control>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="quantity" label='Quantity'>
                <Form.Control type='number' placeholder='Enter product quantity' required ref={quantityRef} defaultValue={product.quantity}></Form.Control>
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel controlId="category" label='Category' className="mb-3">
                <Form.Select aria-label="Select category" ref={categoryRef} required onChange={handleCategoryChange} defaultValue={product.category}>
                  <option value="">Select Category</option>
                  <option value="Top Wear">Top Wear</option>
                  <option value="Bottom Wear">Bottom Wear</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Inner & Sleep Wear">Inner & Sleep Wear</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              {subcategories.length > 0 && (
                <FloatingLabel controlId="subcategory" label='Subcategory' className="mb-3">
                  <Form.Select aria-label="Select subcategory" ref={subcategorieRef} required defaultValue={product.subcategory}>
                    <option value="">Select Subcategory</option>
                    {subcategories.map((subcat, index) => (
                      <option key={index} value={subcat}>{subcat}</option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              )}
            </Col>
          </Row>
          <Button className="btn-success mt-4" type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
}

export default EditProduct;
