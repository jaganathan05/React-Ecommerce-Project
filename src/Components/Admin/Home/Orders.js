import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../Layout/Navbar';
import Header from '../Layout/Header';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const token = useSelector((state) => state.AdminAuth.Token);

  useEffect(() => {
    async function fetchOrders() {
      const response = await axios.get('http://localhost:4000/admin/orders', {
        headers: {
          Authorization: token,
        },
      });
      setOrders(response.data.orders);
    }

    fetchOrders();
  }, [token]);

  const handleStatusUpdate = async () => {
    if (!selectedOrderId || !newStatus) {
      alert('Please select an order and status');
      return;
    }

    try {
      const response = await axios.put('http://localhost:4000/admin/update-status', {
        orderId: selectedOrderId,
        status: newStatus,
      },{
        headers:{
          Authorization : token
        }
      });

      if (response.data.success) {
        alert('Order status updated successfully');
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status');
    }
  };

  return (
    <div className="container mt-4">
      <Header/>
      <h2 className="mb-4 text-primary">Admin: Manage Orders</h2>

      {orders.map((order) => (
        <Card className="mb-4" key={order._id}>
          <Card.Header>
            <strong>Order ID:</strong> {order._id}
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <Card.Title>User Information</Card.Title>
                <p><strong>Name:</strong> {order.user.name}</p>
                <p><strong>Email:</strong> {order.user.email}</p>
                <p><strong>Phone:</strong> {order.user.phoneno}</p>
              </Col>
              <Col md={4}>
                <Card.Title>Shipping Information</Card.Title>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              </Col>
              <Col md={4}>
                <Card.Title>Order Details</Card.Title>
                {order.products.map((product) => (
                  <div key={product._id}>
                    <p><strong>Product ID:</strong> {product.product}</p>
                    <p><strong>Quantity:</strong> {product.quantity}</p>
                    <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                  </div>
                ))}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={8}>
                <Form.Group as={Row}>
                  <Col sm="8">
                    <Form.Select onChange={(e) => {setSelectedOrderId(order._id) 
                setNewStatus(e.target.value)}}>
                      <option value="">Select New Status</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </Form.Select>
                  </Col>
                  <Col sm="4">
                    <Button variant="success" onClick={handleStatusUpdate}>Update Status</Button>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Orders;
