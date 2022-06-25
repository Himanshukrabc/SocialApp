import React, { useContext, useRef } from 'react'
import './login.css'
import {loginCalls} from '../../apiCalls'
import {AuthContext} from '../../context/AuthContext'
import {CircularProgress} from "@mui/material"
import { Link } from 'react-router-dom'

export default function Login() {
    const email=useRef();
    const password=useRef();
    const {isFetching,error,dispatch} = useContext(AuthContext);
    const handleClick=(e)=>{
        e.preventDefault();
        loginCalls({email:email.current.value,password:password.current.value},dispatch);
    };
    // console.log(user);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">LamaSocial</h3>
                    <span className="loginDesc">
                        Connect with friends on LamaSocial
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="email" placeholder='Email' className="loginInput" ref={email} required/>
                        <input type="password" placeholder='Password' className="loginInput" ref={password} required minLength='6'/>
                        <button className="loginButton" disabled={isFetching}>{isFetching?<CircularProgress color='inherit' size='20px'/>:"Log In"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to="/register">
                            <button className="loginRegister" disabled={isFetching}>{isFetching?<CircularProgress color='inherit' size='20px'/>:"Create a new account"}</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
