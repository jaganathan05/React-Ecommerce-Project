import React, {  useRef, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import classes from './Login.module.css'
import axios from "axios";
import { useDispatch } from "react-redux";
import { AdminAuthactions } from "../../../Store/Slices/AdminAuth";
function Login (){
    const [isvalidated,setvalidated]=useState(false)
    const emailref = useRef()
    const passwordref = useRef()
    const history = useHistory();
    const dispatch = useDispatch()
    const submitformHandler = async (event)=>{ 
        event.preventDefault()
        let formvalid = false;
        
        const EnteredEmail = emailref.current.value
        const EnteredPassword = passwordref.current.value

        if(!EnteredEmail.trim().includes('@')){
            
                    alert('Enter Email Correctly')
                    setvalidated(false)
        }
        else{
            if(EnteredPassword.length < 6){
                alert('PassWord Must Contain 6 letters')
                setvalidated(false)
              }
              if(EnteredPassword.length >= 6){
                    formvalid= true
                    setvalidated(true)
                    
              }
        }

        if(formvalid){
       
          const data ={
                    email: EnteredEmail,
                    password: EnteredPassword
          } 
          //console.log(data)
          const response =await axios.post('http://localhost:4000/admin/login',data)
          

          if(response){
            console.log(response)
            localStorage.setItem('admintoken',response.data.token)
            dispatch(AdminAuthactions.login(response.data.token))
            history.push('/admin/Home')
          }
          else {
            const errorData = await response.json(); 
            setvalidated(false)
            alert(errorData.error.message); 
        }
        }
        

        

    }


   

    return <div className={classes["login-container"]}>

        <Form validated={isvalidated} className={classes['login-box']}>
            <h2>Admin Login</h2>
            <FloatingLabel  controlId="email" label='Email' className="mb-3"  >
                <Form.Control type='email' placeholder='dsa' required ref={emailref} ></Form.Control >
            </FloatingLabel>
            <FloatingLabel controlId="password" label='Password' className="mb-3"  >
                <Form.Control type='password' placeholder='dsa' ref={passwordref} ></Form.Control>
            </FloatingLabel>
            <Button className="btn-dark btn-outline-info" onClick={submitformHandler}>Submit</Button>
            <br/>

        </Form>
    </div>

}

export default Login;