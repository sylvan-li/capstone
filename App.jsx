import React, { useEffect, useState } from 'react';
import {Routes, Route } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';

import AllProducts from './allProducts';
import SingleProduct from './singleProduct';
import Navigation from './navBar';
import LoginPage from './login';
import Account from './account';
import Cart from './cart';
import addToCartHandler from './addToCartLogic';
import Checkout from './checkout';
import '../style/index.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  //state to store API data 
  const [apiData, setApiData] = useState(null);

  const navigate = useNavigate(); // Add this line to get the navigate function

  useEffect(()=>{
    //check if user is logged in on component mount 
    const userToken = localStorage.getItem('userToken');
    if (userToken && userToken !== ''){
      setIsLoggedIn(true);
      //if logged in, load cart data from local storage 
      const storedCart = JSON.parse(localStorage.getItem(`cartItems_${userId}`)) || [];
      setCartItems(storedCart);
    } else {
      setIsLoggedIn(false);
      //if logged out, set cart to empty 
      setCartItems([]);
    }
  }, [isLoggedIn]); 

  const handleAddToCart = (product) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);

    const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1; 
      setCartItems(updatedCart);
    } else {
      //if the product is not in the cart, add it with a quantity of 1
      const updatedCart = [...cartItems, {...product, quantity: 1}];
      setCartItems(updatedCart);
    }

    setCartItemsCount(cartItemCount + 1);

    localStorage.setItem(isLoggedIn? `cartItems_${userId}` : `cartItems`, JSON.stringify(cartItems));

  };

  
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false); // Set state explicitly
    //clear cart on logout
    setToken(null);
    setCartItems([]);
    navigate('/');
  };

  //save cart data to local storage when cartItems state changes 
  useEffect(()=> {
    localStorage.setItem(isLoggedIn? `cartItems_${userId}` : `cartItems`, JSON.stringify(cartItems));
  }, [cartItems]);

  //load cart data from localStorage on component mount
  useEffect(()=>{
    const storedCart = JSON.parse(localStorage.getItem(isLoggedIn? `cartItems_${userId}` : `cartItems`));
    if (storedCart){
      setCartItems(storedCart);
    }
  },[userId]);

  //fetching api data 
  useEffect(()=> {
    const fetchData = async()=> {
      try{
        //make an API request 
        const response =await fetch('https://fakestoreapi.com/users');
        if (!response.ok){
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        //update state with API data 
        setApiData(data);

        //store API data in local storage 
        localStorage.setItem('apiData', JSON.stringify(data));
      } catch (error) {
        console.error('error fetching data:', error);
      }
    }; 

    //check if data is in local storage 
    const storedData = localStorage.getItem('apiData');
    if (storedData) {
      setApiData(JSON.parse(storedData));
    } else {
      //if no data in local storage, fetch data from API 
      fetchData();
    }
  },[]);

  //tracking cart item changes: 
  const handleCartItemChanges = (newCartItems) => {
    setCartItems(newCartItems);
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  

  return (
    
    <>
    
      
      <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} cartItemCount={cartItemCount} />
      <Routes>
        <Route path="/" element={<AllProducts isLoggedIn={isLoggedIn} userId={userId} onAddToCartHandler={addToCartHandler} cartItems ={cartItems} setCartItems={setCartItems} />} />
        
        <Route path="/products/:id" element={<SingleProduct addToCartHandler={addToCartHandler} cartItems ={cartItems} setCartItems={setCartItems} />} />

        <Route path="/login" element={<LoginPage token = {token} setToken = {setToken} apiData = {apiData} setUserId = {setUserId} setIsLoggedIn ={setIsLoggedIn} />} />

        <Route path="/account" element={<Account />} />
        
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} isLoggedIn={isLoggedIn} userId = {userId}/>}/>

        <Route path = "/checkout" element={<Checkout/>}/>
      </Routes>


  </>
    
  );
};
export default App;