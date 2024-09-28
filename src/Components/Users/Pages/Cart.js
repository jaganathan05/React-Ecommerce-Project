import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap"; 
import { useEffect, useState } from "react";
import { Cartactions, updateCart } from "../../../Store/Slices/Cart";

import './Cart.css';
import axios from "axios";



function CartItems() {
  const [address, setAddress] = useState("");  
  const [isAddressValid, setIsAddressValid] = useState(true);
  const cartitems = useSelector(state => state.Cart.CartItems);
  const totalAmount = useSelector(state => state.Cart.Total_Amount);
  const dispatch = useDispatch()
  const UserToken = useSelector(state => state.Auth.Token);
 
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false)
    dispatch(updateCart({cartitems, UserToken}))
  };
  const handleShow = () => {setShow(true)
    dispatch(updateCart({cartitems, UserToken}))
  }; 
  useEffect(()=>{
async function fetchcartitems (){
    const response = await axios.get('http://localhost:4000/user/cart',{
        headers : {
            Authorization : UserToken
        }
    }); 
    const CartItems = response.data.cartItems;
    console.log(response.data)
    console.log(CartItems)

    await dispatch(Cartactions.fetchcartItems(CartItems)) 
    //console.log(cartitems)
}
if(UserToken){
    fetchcartitems()
}


  },[UserToken,dispatch])
  

  const decreaseCartQuantity = (item)=>{
     dispatch(Cartactions.removeCartItems(item))
    
  }
  const IncreaseCartQuantity = (item)=>{
   dispatch(Cartactions.increaseCartItems(item))
    
  }

  const handleOrder = async () => {
    if (!address) {
      setIsAddressValid(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/user/place-order', 
        { address }, 
        { headers: { Authorization: UserToken } }
      );

      if (response.data.success) {
        alert('Order placed successfully!');
        dispatch(Cartactions.clearCart());
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View Cart
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartitems.length > 0 ? (
            <>
              {cartitems.map(item => (
                <div  key={item.product._id} className="cart-item ">
                    <div >
                    <img
                    src={item.product.imageurl}
                    alt={item.product.name}
                    style={{ width: "100px", height: "100px", marginRight: "10px" }}
                  /> <div className="d-flex flex-row"> <Button onClick={()=> decreaseCartQuantity(item)}>-</Button><p>{item.quantity}</p><Button onClick={()=>{IncreaseCartQuantity(item)}}>+</Button></div> 
                  <div>
                    </div>

                    <h5>{item.product.name}</h5>
                    <p>Category: {item.product.category}</p>
                    <p>Price: ₹{item.product.saleprice}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: ₹{item.product.saleprice * item.quantity}</p>
                  </div>
                </div>
              ))}
              <hr />
              <h4>Total Amount: ₹{totalAmount}</h4>
              {/* Address input */}
              <Form.Group controlId="addressInput">
                <Form.Label>Delivery Address</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your address" 
                  value={address} 
                  onChange={e => { setAddress(e.target.value); setIsAddressValid(true); }} 
                  isInvalid={!isAddressValid}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid address.
                </Form.Control.Feedback>
              </Form.Group>

              <Button className="btn-danger" onClick={handleOrder}>Buy</Button>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CartItems;
