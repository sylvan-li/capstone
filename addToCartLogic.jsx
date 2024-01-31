const addToCartHandler = (product, setCartItems) => {
    setCartItems((prevCartItems)=> [...prevCartItems, product]);
    console.log('product added to cart successfully');
}; 

export default addToCartHandler;