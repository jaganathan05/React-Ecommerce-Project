import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import {catagoryactions} from '../../../Store/Slices/Catagory';
import Button from 'react-bootstrap/Button';

function NavBar() {
  const categories = {
    "Top Wear": ["T-Shirts", "Shirts"],
    "Bottom Wear": ["Jeans", "Trackpants"],
    "Accessories": ["Bags", "Belts", "Watches"],
    "Inner & Sleep Wear": ["Nightwear"]
  };
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSelect = (subcategory) => {
    dispatch(catagoryactions.setSubcategory(subcategory));
    history.push('/admin/products');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/admin/products">Product Store</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Button onClick={()=>handleSelect()}>All Products</Button>
          {Object.keys(categories).map((category, index) => (
            <NavDropdown key={index} title={category} id={`nav-dropdown-${index}`}>
               
              {categories[category].map((subcategory, subIndex) => (
                <NavDropdown.Item 
                  key={subIndex} 
                  onClick={() => handleSelect(subcategory)}
                >
                  {subcategory}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
