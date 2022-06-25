import { Link, useNavigate } from 'react-router-dom'
import React, { useRef } from 'react'
import './register.css'
import axios from 'axios';

export default function Register() {
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const passwordAgain=useRef();
    const navigate = useNavigate();
    const handleClick=async (e)=>{
        e.preventDefault();
        if(password.current.value!==passwordAgain.current.value){
            passwordAgain.current.setCustomValidity("Entered passwords don't match.");
        }
        else{
            const user = {
                username:username.current.value,
                email:email.current.value,
                password:password.current.value,
            }
            try{
                await axios.post("auth/register",user);
                navigate("/login");
            }
            catch(err){
                console.log(err);
            }
        }
    };
    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">LamaSocial</h3>
                    <span className="registerDesc">
                        Connect with friends on LamaSocial
                    </span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleClick}>
                        <input type="text" placeholder='Username' className="registerInput" ref={username} required/>
                        <input type="email" placeholder='Email' className="registerInput" ref={email} required/>
                        <input type="password" placeholder='Password' className="registerInput" ref={password} required minLength="6"/>
                        <input type="password" placeholder='Enter Password Again' className="registerInput" ref={passwordAgain} required minLength="6"/>
                        <button className="registerButton" type='submit'>Sign Up</button>
                        <span className="registerForgot">Forgot Password?</span>
                        <Link to="/login">
                            <button className="registerRegister">Log in to your account</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
