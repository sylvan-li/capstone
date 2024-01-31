import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

//need to add a render for when user is logged in - do after implementing shopping cart and adding 
export default function Login({token, setToken, apiData, setUserId, setIsLoggedIn}) {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });
    const [authenticatedUserId, setAuthenticatedUserId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    loginUser(loginForm);
  };

  const loginUser = (userData) => {
    fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((json) => {

        if (json.token) {
          const authenticatedUserId = json.id;
          setAuthenticatedUserId(authenticatedUserId);
          
          setToken(json.token);
          //store the token in localStorage 
          localStorage.setItem('userToken', json.token);
          setToken(json.token);
          setIsLoggedIn(true); //update login status 
          localStorage.setItem('authToken', json.token);
          setIsLoggedIn(true);
          // localStorage.setItem('userName', )

          //set cart items for logged in user
          const cartItemsKey = `cartItems_${authenticatedUserId}`;
          const storedCartItem = localStorage.getItem(cartItemsKey); 
          const initialCartItems = storedCartItems ? JSON.parse(storedCartItems):[]; 
          localStorage.setItem(cartItemsKey, JSON.stringify(initialCartItems));
          const user = apiData.filter(_user => {
            return _user.username === userData.username;
          })[0];
          

          setUserId(user.id);
          //store the userId into localstorage
          localStorage.setItem('userId', user.username);

          navigate('/');

          console.log('login successful!')
          console.log(user.username);
        }
        console.log(json);
      })
      .catch((error) => console.error('Error logging in:', error));

      
  };

  // Form submission logic
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted!');
  };

  const handleLogout = () => {
    console.log('logging out...'); 
    localStorage.removeItem('userToken');
    onLogOut();
    // setIsLoggedIn(prevIsLoggedIn => {
    //   console.log('isLoggedIn before update:', prevIsLoggedIn);
    //   return false;
    // });
    // console.log('isLoggedIn after logout:', isLoggedIn);
    navigate('/');
  };

  //set cart items for the logged in user
  const cartItemsKey = `cartItems_${authenticatedUserId}`;
  const storedCartItems = localStorage.getItem(`cartItems_${authenticatedUserId}`);
  const initialCartItems = storedCartItems ? JSON.parse(storedCartItems) : []; /* logic to get or initialize cart items */
  localStorage.setItem(cartItemsKey, JSON.stringify(initialCartItems));

  return (
    <div className = "content">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" name="username" value={loginForm.username} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={loginForm.password} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}