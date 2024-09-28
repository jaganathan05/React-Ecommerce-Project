import { configureStore } from '@reduxjs/toolkit';
import AdminAuth from './Slices/AdminAuth';
import catagoryReducer from './Slices/Catagory'
import UserAuth from './Slices/UserAuth'
import CartReducer from './Slices/Cart'
const store = configureStore({
  reducer:{  AdminAuth : AdminAuth , Catagory : catagoryReducer , Auth : UserAuth , Cart : CartReducer } 
});



export default store;