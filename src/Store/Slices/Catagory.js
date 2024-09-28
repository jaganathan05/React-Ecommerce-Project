import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '',
  subcategory: ''
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSubcategory(state, action) {
      state.subcategory = action.payload;
    }
  }
});

export const catagoryactions =  categorySlice.actions;

export default categorySlice.reducer;
