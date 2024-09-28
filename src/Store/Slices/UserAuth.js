import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem('token')
let initialState = { Token : token , isLoggedin : !!token}
console.log(initialState)

const AutheiticateSlice = createSlice({
    name: 'Auth',
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

export const Authactions = AutheiticateSlice.actions;
export default AutheiticateSlice.reducer;