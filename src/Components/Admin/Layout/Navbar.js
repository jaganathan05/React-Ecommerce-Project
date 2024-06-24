import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import './NavBar.css'

function NavBar() {
  return (
    <Navbar expand="lg" className="navbar-container">
      <Container>
        <Navbar.Brand as={Link} to="/admin/home" className='navbar-brand'>Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin/products" className='navbar-links'>All Products</Nav.Link>
            <Nav.Link as={Link} to="/admin/add-product" className='navbar-links'>Add Product</Nav.Link>
            <NavDropdown title="Orders"  id="basic-nav-dropdown" className='navbar-dropdown'>
              <NavDropdown.Item as={Link} to="/admin/orders">View Orders</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/admin/orders/ship">Mark as Shipped</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/orders/deliver">Mark as Delivered</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/orders/cancel">Cancel Order</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
