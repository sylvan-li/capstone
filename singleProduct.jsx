import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import api from './api'
import AddButton from './addButton';
import addToCartHandler from './addToCartLogic'

const SingleProduct = ({ isLoggedIn, userId, onAddToCartHandler, handleAddToCart, cartItemCount, cartItems, setCartItems}) => {
    const {id} = useParams();
    const [product, setProduct] = useState (null);
    // const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    // const [cartItems, setCartItems] = useState([]);  //state to track items in the cart 

    useEffect(()=>{
        const fetchProduct = async () => {
            try{
                const response = await fetch(`${api}/${id}`);
                const jsonData = await response.json();

                console.log(jsonData);

                if (jsonData) {
                        setProduct(jsonData);
                    } else {
                        console.error('error fetching product data', jsonData);
                    }
                } catch (error){
                    console.error('error fetching product data', error);
                }
            };
            fetchProduct();
        }, [id]);

        const goBack = ()=>{
            navigate(-1);
        };

        
    const addToCart = (product)=> {
        const localStorageKey = isLoggedIn? `cartItems_${userId}` : `cartItems`;
        console.log('localStorageKey:', localStorageKey);

        //get existing cart items from localStorage
        const storedCart = localStorage.getItem(localStorageKey);
        const existingCartItems = storedCart ? JSON.parse(storedCart): [];

        //check if product is already in cart 
        const duplicateProduct = existingCartItems.findIndex((item) => item.id === product.id);

        if(duplicateProduct !== -1) {
            //if product is already in the cart, update the quantity 
            const updatedCart= [...existingCartItems];
            updatedCart[duplicateProduct].quantity += 1;
            console.log('quantity updated in cart successfully ');

            //update localStorage with the updated cart 
            localStorage.setItem(localStorageKey, JSON.stringify(updatedCart))

            //update state to trigger re-render
            setCartItems(updatedCart);
        } else {
            //if the product is not in the cart, add it 
            const updatedCart = [...existingCartItems, {...product, quantity: 1}];
            console.log('product added to cart succssssfully');

            //update localStorage with the updated cart 
            localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));

            setCartItems(updatedCart);
            console.log("test this updated cart", updatedCart)
        }
    };
        return(
            <div className = "content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {product ? (
        <div>
          <h2 className = "center">{product.title}</h2>
          {product.image && (
            <div className="product-image-container">
            <img 
              className = "product-image"  
              src={product.image}
              alt={product.title}
              style={{ width: '300px', height: 'auto', margin: 'auto' }}
            />
            </div>
          )}
          <br></br>
          <p>Description: {product.description}</p>
          <p> Price: ${product.price}</p>
          <p> User Rating: {product.rating.rate}</p>
         
        </div>
      
            ):(
                <p>Loading...</p>
            )}
            <div className="button-Container">
                <button onClick={goBack}>Back</button>
                <AddButton onClick = {()=>addToCart(product)} children ="Add to cart"/>
                
            </div>
            
            
            {/* <AddButton onClick = {()=>addToCartHandler(product)} children="Add to cart"/>
            <AddtoCartButton onClick ={()=>addtoCartHandler(product, setCartItems)}/> */}

        </div>
        );
};
export default SingleProduct; 