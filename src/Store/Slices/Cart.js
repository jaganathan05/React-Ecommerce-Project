import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  CartItems: [],
  Total_Amount: 0
};

export const updateCart = createAsyncThunk(
  'cart/updateCartItems', async ( {cartitems,UserToken}, { rejectWithValue })=>{
    try {
        console.log(cartitems , UserToken);
        const response = await axios.post('http://localhost:4000/user/cart/update', { cartitems },{
            headers :{
                Authorization : UserToken
              }
        }); 
        return response.data; 
      } 
      catch (err) {
        return rejectWithValue(err.response.data);
      }
  }
)

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItems(state, action) {
      const product = action.payload;
      console.log(action.payload)
      const existingItem = state.CartItems.find(item => item.product._id === product._id);

      if (existingItem) {
       if( existingItem.quantity < existingItem.product.remainquantity){
        existingItem.quantity += 1;
       }
        
      } else {
   
        state.CartItems.push({ product: product, 
                              quantity: 1} );
      }

  
      state.Total_Amount = state.CartItems.reduce((total, item) => {
        return total + item.product.saleprice * item.quantity;
      }, 0); 
      
      
     
    },
    increaseCartItems(state,action){
      const product = action.payload;
      console.log(action.payload)
      const existingItem = state.CartItems.find(item => item.product._id === product.product._id);

      if (existingItem) {
       if( existingItem.quantity < existingItem.product.remainquantity){
        existingItem.quantity += 1;
       }
        
      } else {
   
        state.CartItems.push({ product: product, 
                              quantity: 1} );
      }

  
      state.Total_Amount = state.CartItems.reduce((total, item) => {
        return total + item.product.saleprice * item.quantity;
      }, 0);
      
    },
    removeCartItems(state, action) {
      const product = action.payload;
      console.log(product)
      const existingItem = state.CartItems.find(item => item.product._id === product.product._id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
       
          state.CartItems = state.CartItems.filter(item => item.product._id !== product.product._id);
        } else {
     
          existingItem.quantity -= 1;
        }
      }

   
      state.Total_Amount = state.CartItems.reduce((total, item) => {
        return total + item.product.saleprice * item.quantity;
      }, 0);
    },
    fetchcartItems(state,action){
        console.log(action.payload )
        state.CartItems = action.payload;
        state.Total_Amount = state.CartItems.reduce((total, item) => {
            return total + item.product.saleprice * item.quantity;
          }, 0);
    },
    logout(state,action){
        state.CartItems = []
        state.Total_Amount = 0
    },
    clearCart(state,action){
      state.CartItems = []
        state.Total_Amount = 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        state.CartItems = action.payload.cartItems || state.CartItems;
        state.Total_Amount = state.CartItems.reduce((total, item) => {
            return total + item.product.saleprice * item.quantity;
          }, 0);
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const Cartactions = CartSlice.actions;

export default CartSlice.reducer;
