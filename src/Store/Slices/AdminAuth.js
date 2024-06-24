import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem('admintoken')
let initialState = { Token : token , isLoggedin : !!token}
console.log(initialState)

const AdminAutheiticateSlice = createSlice({
    name: 'AdminAuth',
    initialState ,
    reducers : {
        login(state,action){
                state.Token = action.payload;
                state.isLoggedin = !!action.payload ;


        },
        logout(state){
            state.Token = null ;
            state.isLoggedin = false;

        }
    }
})
console.log(initialState)

export const AdminAuthactions = AdminAutheiticateSlice.actions;
export default AdminAutheiticateSlice.reducer;