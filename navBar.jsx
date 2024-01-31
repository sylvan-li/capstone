import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function Navigation ({isLoggedIn, handleLogout, cartItemCount}){

// export default function Navigation ({isLoggedIn, handleLogout, cartItemCount}){
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    console.log('isLoggedIn:', isLoggedIn);

    return (
        <nav className = "navbar">
            <ul className="nav-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to ="/cart">Cart ({cartItemCount})</Link></li>
                <li><Link to="/account">Account</Link></li>
            
            {isLoggedIn ? (
                //if logged in, show the logout link 
                <button 
                    onClick={() => {
                        handleLogout();
                    }}
                >
                    Log out  
                </button>
            ) : (
                //if not logged in, show the login link
                <li><Link to ="/login" onClick = {handleLoginClick}>
                    Login 
                </Link></li>
            )}
            {/* <Link to ="/login">Login</Link> */}
            </ul>
        </nav>
    );
}