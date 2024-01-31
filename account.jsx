import React, {useState, useEffect} from 'react';

import {Link} from 'react-router-dom';

export default function Account (){
    //tracking login status
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [storedUser, setStoredUser] = useState(null);

    //simulate token retrieval on component mount 
    useEffect(()=>{
        const storedToken = localStorage.getItem('userToken');

        //update login status based on presence of the token 
        setIsLoggedIn(!!storedToken);

        const storedUserId = localStorage.getItem('userId');

        setStoredUser(storedUserId);

    // try{
    //     const parsedUserId= JSON.parse(storedUserId); 
    //     setStoredUser(parsedUserId);
    // } catch (error){
    //     console.error('error parsing user Id:', error);
    //     setStoredUser(null);
    // }

    }, []);

    
    
    return (
        <>
        <div className = "content">
            <h2>Account</h2>
        </div>
        <div>
            {/*conditionally render based on login status*/}
            {isLoggedIn ? (
                <p>Welcome Back {storedUser}</p>
                
            ):(
                //if not logged in show login button
                <p>
                    Login to view your account details{' '}
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </p>
            )}
        </div>
        </>
        
    )
};