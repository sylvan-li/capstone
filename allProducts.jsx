import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import api from './api';
import AddButton from './addButton';
import addToCartHandler from './addToCartLogic'

const AllProducts = ({isLoggedIn, userId, onAddToCartHandler, handleAddToCart, cartItemCount, cartItems, setCartItems})=>{
    //this is for rendering all products
    const [products, setProducts] = useState([]);
    //this is for filtering and sorting products 
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState(''); 
    const [typeFilter, setTypeFilter] = useState(''); //filter criteria for type
    const [priceFilter, setPriceFilter] = useState(''); //filter criteria for price 
    const [sortBy, setSortBy] = useState (''); //sorting criteria (ex. price, title)
    //tracking price range 
    const [priceRange, setPriceRange] = useState([0, 1000]); // default price range 
    const [sliderValue, setSliderValue] = useState ([0, 1000]); // seperate state for price slider value
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [userId, setUserId] = useState(null);
    // const [cartItems, setCartItems] = useState([]);  //state to track items in the cart 
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(api);
                console.log('API Response:', response);
                const jsonData = await response.json();
                console.log('API Data:', jsonData);
                setProducts(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [])

    console.log(products);

    useEffect(() => {
        // Filtering logic
        //log values for debugging: 
        console.log('Category Filter:', categoryFilter); 
        console.log('Type Filter:', typeFilter);
        console.log('Price Filter:', priceFilter);
        
        const filteredData = products.filter((product) => {
            const categoryMatch = categoryFilter === '' || product.category === categoryFilter; 
            const typeMatch = typeFilter === '' || product.type === typeFilter; 
            const priceMatch = priceFilter === '' || product.price <= Number(priceFilter);
            return categoryMatch && typeMatch && priceMatch; 
        });
      
        // Sorting logic for "low price" and "high price"
        const sortedData = sortBy !== ''
        ? [...filteredData].sort((a, b) => {
            if (sortBy.includes('price')) {
                return a.price - b.price;
            } else {
                const aValue = a[sortBy];
                const bValue = b[sortBy];
                if (aValue !== undefined && bValue !== undefined) {
                    return aValue.toString().localeCompare(bValue.toString()) || 0; 
                } else {
                    return 0;
                }
            }
        })
        : filteredData;
    
      // Reverse order for 'highprice'
      if (sortBy === 'highprice') {
        sortedData.reverse();
      }
    
      
        setFilteredProducts(sortedData);
      }, [products, categoryFilter, typeFilter, priceFilter, sortBy, sliderValue]);


    const handleFilterChange = (e) => {
        const {name, value} = e.target;

        if (name === 'category'){
            setCategoryFilter(value);
        } else if (name === 'type') {
            setTypeFilter(value);
        } else if (name === 'price') {
            setPriceFilter(value);
        } else if (name === 'price-slider'){
            const newSliderValue = value.split(',').map(Number);
            setSliderValue(newSliderValue);
            setPriceFilter(value);
        }
    };


    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    //logic to add current product to the shopping cart -> to complete 
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

            console.log('existingCartItems:', existingCartItems);
            console.log('duplicateProduct:', duplicateProduct);
            console.log('updatedCart:', updatedCart);
        }
    };

    // //this is the start of the old 
    // const addToCart = (product) => {
    //     handleAddToCart(product);
    // //     onAddToCartHandler(product, setCartItems);
    // //   };

    // //logic to add current product to the shopping cart -> to complete 
    // // const addToCart = (product)=> {
    //     const localStorageKey = isLoggedIn? `cartItems_${userId}` : `cartItems`;

    //     //get existing cart items from localStorage
    //     const storedCart = localStorage.getItem(localStorageKey);
    //     const existingCartItems = storedCart ? JSON.parse(storedCart): [];

    //     //check if product is already in cart 
    //     const duplicateProduct = existingCartItems.findIndex((item) => item.id === product.id);

    //     if(duplicateProduct !== -1) {
    //         //if product is already in the cart, update the quantity 
    //         const updatedCart= [...existingCartItems];
    //         updatedCart[duplicateProduct].quantity += 1;
    //         console.log('quantity updated in cart successfully ');

    //         //update localStorage with the updated cart 
    //         localStorage.setItem(localStorageKey, JSON.stringify(updatedCart))

    //         //update state to trigger re-render
    //         setCartItems(updatedCart);
    //     } else {
    //         //if the product is not in the cart, add it 
    //         const updatedCart = [...existingCartItems, {...product, quantity: 1}];
    //         console.log('product added to cart succssssfully');
    // const addToCart = (product)=> {
    //     const localStorageKey = isLoggedIn? `cartItems_${userId}` : `cartItems`;
    //     console.log('localStorageKey:', localStorageKey);

    //     //get existing cart items from localStorage
    //     const storedCart = localStorage.getItem(localStorageKey);
    //     const existingCartItems = storedCart ? JSON.parse(storedCart): [];

    //     //check if product is already in cart 
    //     const duplicateProduct = existingCartItems.findIndex((item) => item.id === product.id);

    //     if(duplicateProduct !== -1) {
    //         //if product is already in the cart, update the quantity 
    //         const updatedCart= [...existingCartItems];
    //         updatedCart[duplicateProduct].quantity += 1;
    //         console.log('quantity updated in cart successfully ');

    //         //update localStorage with the updated cart 
    //         localStorage.setItem(localStorageKey, JSON.stringify(updatedCart))

    //         //update state to trigger re-render
    //         setCartItems(updatedCart);
    //     } else {
    //         //if the product is not in the cart, add it 
    //         const updatedCart = [...existingCartItems, {...product, quantity: 1}];
    //         console.log('product added to cart succssssfully');

    // //         //update localStorage with the updated cart 
    // //         localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));
    //         //update localStorage with the updated cart 
    //         localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));

    //         setCartItems(updatedCart);
    //         console.log("test this updated cart", updatedCart)

    //         console.log('existingCartItems:', existingCartItems);
    //         console.log('duplicateProduct:', duplicateProduct);
    //         console.log('updatedCart:', updatedCart);
    //     }
    // };
  
    return(
        <div className = "content">
            {isLoading && <h2>Loading...</h2>}
            {!isLoading && (
                <>
<h2><center>All Products</center></h2>
           
           <div className = "sort">
               <div>
                   <label>Sort By: </label>
                   <select value = {sortBy} onChange={handleSortChange}>
                       <option value ="">All</option>
                       <option value ="title">Name</option>
                       <option value = "highprice">Price: High - Low </option>
                       <option value = "lowprice">Price: Low - High </option>
                   </select>
                   {sortBy === 'lowprice' || sortBy === 'highprice' ? (
                       <div>
                           <input 
                               type = "range"
                               name = "price-slider"
                               value = {sliderValue.join(',')}
                               onChange={(e) => handleFilterChange(e)}
                               min = "0"
                               max = "1000"
                           />
                           <div>
                               <span>{sliderValue[0]}</span>
                               <span>{sliderValue[1]}</span>
                           </div>
                       </div>
                   ): null}
               </div>
               
               <div>
               <label>Filter: </label>
               <select name = "category" value = {categoryFilter} onChange={handleFilterChange}>
                   <option value ="">All</option>
                   
                   {[...new Set(products.map(product=> product.category))].map(category=> (<option key={category} value ={category}>{category}</option>))}
                   
               </select>
           </div>

           </div>

          

           <div className="product-grid">
               {filteredProducts.map((product)=>
                   <div key={product.id} className="product-item">
                   <p>{product.title}</p>
                   {product.image && (<img 
                       src={product.image} 
                       alt={product.title} 
                   />)}
                   <p>Price: ${product.price.toFixed(2)}</p>
                   
                   <button onClick = {()=> navigate(`/products/${product.id}`)}>View Product</button>
                   {/* <Link to={`/products/${product.id}`}>
                     <button>View Product</button> */}
                   {/* </Link> */}
                   {/* <AddButton onClick = {()=>addToCart(product)} children>Add to Cart</AddButton> */}
                   <AddButton onClick = {()=>addToCart(product)} children ="Add To Cart"/>
                   </div>
              )}    
           </div>
           </>
        )}
    </div>
            
    );
}; 

export default AllProducts;