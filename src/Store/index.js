import { configureStore } from '@reduxjs/toolkit';
import AdminAuth from './Slices/AdminAuth';
const store = configureStore({
  reducer:{  AdminAuth : AdminAuth} 
});



export default store;