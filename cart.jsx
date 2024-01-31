import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

//use the navigation to move to a checkout page

//using localStorage to persist cart items 
const Cart = ({ cartItems, setCartItems, isLoggedIn, userId }) => {
    const navigate = useNavigate();
    //define localStorage key based on user authentication status 
    const localStorageKey = isLoggedIn? `cartItems_${userId}` : `cartItems`;
  // state to track the total price of items
  const [totalPrice, setTotalPrice] = useState(0);
  

  useEffect(() => {
    // retrieve cartItems from localStorage when component mounts 
    const storedCartItems = localStorage.getItem(localStorageKey);

    try {
        const parsedCartItems = storedCartItems ? JSON.parse(storedCartItems) : []; 
        //update local state only after processing the retrieved data
        setCartItems(parsedCartItems);
        console.log(parsedCartItems);

        //update the total price after setting cartItems 
        const newTotalPrice = 
          parsedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(newTotalPrice);
    } catch (error) {
        console.error('error getting cartItems from localStorage', error);
    }
  }, [localStorageKey, setCartItems]);

  //update total price and localstorage when cartItems change 
    useEffect(()=>{
      const newTotalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0); 
      setTotalPrice(newTotalPrice);
    
    //update localStorage when cartItems change
      localStorage.setItem(localStorageKey, JSON.stringify(cartItems));
    }, [cartItems, localStorageKey]); 

    const handleRemoveItem = (itemId) => {
      // Use setCartItems to update the cartItems state
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.id !== itemId)
      );
    };
      
    const handleQuantityChange = (itemId, newQuantity) => {
      if (newQuantity <=0) {
        const confirmRemove = window.confirm('Do you want to remove this item from the cart?');

        if (confirmRemove) {
          setCartItems((prevCartItems) => 
          prevCartItems.filter((item) => item.id !== itemId)
          );
        }
      } else {
        setCartItems((prevCartItems) => 
      prevCartItems.map((item)=>
      item.id === itemId ? {...item, quantity: newQuantity }: item
      )
    );
  }
};


  return (
    <div className = "content">
      <h2>Cart</h2>
      <div>
        {cartItems ? (
          cartItems.length === 0 ? (
            <>
              <center><h3>Your cart is empty</h3></center>
              <center><button onClick = {()=> navigate('/')}>Browse products</button></center>
            </>
            
          ) : (
            <>
              <h3>Items in your cart</h3>
              <ul className = "cart-item-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    {item.image && <img src={item.image} alt ={item.title} width = "70px"/>}
                    <div>
                    {item.title}-${item.price.toFixed(2)}
                    </div>
                    
                    <label>
                      Quantity:  
                      <input type = "number"
                        value = {item.quantity}
                        onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value, 10))
                      }
                      />
                    </label>
                    <button onClick={() => handleRemoveItem(item.id)}>
                      Remove Item
                    </button>
                  </li>
                ))}
              </ul>
              <p>Total Price: ${totalPrice.toFixed(2)}</p>
              <center><button onClick = {()=> navigate(`/checkout?totalPrice=${totalPrice}`)} disabled={cartItems.length === 0}>Proceed to Check Out</button></center>
            </>
          )
        ) : (
          <p>Error: cart items are not defined </p>
        )}
      </div>
      
    </div>
  );
};

export default Cart;