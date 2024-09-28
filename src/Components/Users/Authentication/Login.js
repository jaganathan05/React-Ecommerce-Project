import React, {  useRef, useState } from "react";
import {Link, useHistory} from "react-router-dom/cjs/react-router-dom"
import classes from './Login.module.css'
import  Button from "react-bootstrap/Button";
import  FloatingLabel  from "react-bootstrap/FloatingLabel";
import  Form  from "react-bootstrap/Form";
import axios from "axios";
import { Authactions } from "../../../Store/Slices/UserAuth";
import { useDispatch } from "react-redux";

function Login (){
    const dispatch = useDispatch()
    const [isvalidated,setvalidated]=useState(false)
    const emailref = useRef()
    const passwordref = useRef()
    const history = useHistory();
    const submitformHandler = async (event)=>{ 
        try{
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
                        password: EnteredPassword,
              } 
              //console.log(data)
    
              const response = await axios.post('http://localhost:4000/login', data)
    
              if(response){
                console.log('Login successfull')
                console.log(response)
                localStorage.setItem('token',response.data.idToken)
                history.push('/') 
                dispatch(Authactions.login(response.data.idToken));
              }
              else {
                setvalidated(false)
                alert(response.data.message); 
            } 
        }
        }
        catch(error){
            setvalidated(false);
            alert(error.response?.data?.message || 'Login failed. Please try again.');
        }
    

    }


   

    return <div className={classes["login-container"]}>

        <Form validated={isvalidated} className={classes['login-box']}>
            <h2>Login</h2>
            <FloatingLabel  controlId="email" label='Email' className="mb-md-4 mb-sm-4  mb-4"  >
                <Form.Control type='email' placeholder='dsa' required ref={emailref} ></Form.Control >
            </FloatingLabel>
            <FloatingLabel controlId="password" label='Password' className="mb-md-4 mb-sm-4  mb-2"  >
                <Form.Control type='password' placeholder='dsa' ref={passwordref} ></Form.Control>
            </FloatingLabel>
            <div className="d-flex justify-content-center mb-3">
            <Link className={classes['link1']} to='/forgetpassword'>Forget Password!</Link>
            </div>
            <div className="d-flex justify-content-center">
            <Button className="btn-primary" onClick={submitformHandler}>Submit</Button>
            </div>
            <div className="d-flex justify-content-center">
            <Link className={classes['link1']} to='/signup'>If You Don't Have An Account Signup !</Link>

            </div>
            
        </Form>
    </div>

}

export default Login;