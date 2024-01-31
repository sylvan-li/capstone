import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Checkout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalPrice = new URLSearchParams(location.search).get('totalPrice') || 0;

  const [billingAddress, setBillingAddress] = useState({
    city: '',
    state: '',
    zipCode: '',
  });
  const [shippingAddress, setShippingAddress] = useState({
    city: '',
    state: '',
    zipCode: '',
  });
  const [creditCard, setCreditCard] = useState('');
  const [cvv, setCvv] = useState('');

  const handleInputChange = (event, setAddress) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleSubmitOrder = () => {
    window.alert('Thank you for your order!');
    navigate('/');
  };

  return (
    <div className="content">
      <h2>Checkout</h2>
      <Link to="/cart" style={{ textDecoration: 'none', color: 'blue', margin: 16 }}>
        Back to cart
      </Link>
      <div className="side-by-side-containers">
        <div className="creditCardcontainer">
          <h3>Billing Address </h3>
          <p>
            <label>
              City <input type="text" name="city" value={billingAddress.city} onChange={(e) => handleInputChange(e, setBillingAddress)} placeholder="type here" />
            </label>
            <label>
              State <input type="text" name="state" value={billingAddress.state} onChange={(e) => handleInputChange(e, setBillingAddress)} placeholder="type here" />
            </label>
            <label>
              ZipCode <input type="text" name="zipCode" value={billingAddress.zipCode} onChange={(e) => handleInputChange(e, setBillingAddress)} placeholder="type here" />
            </label>
          </p>
        </div>
        <div className="creditCardcontainer">
          <h3>Shipping Address</h3>
          <p>
            <label>
              City <input type="text" name="city" value={shippingAddress.city} onChange={(e) => handleInputChange(e, setShippingAddress)} placeholder="type here" />
            </label>
            <label>
              State <input type="text" name="state" value={shippingAddress.state} onChange={(e) => handleInputChange(e, setShippingAddress)} placeholder="type here" />
            </label>
            <label>
              ZipCode <input type="text" name="zipCode" value={shippingAddress.zipCode} onChange={(e) => handleInputChange(e, setShippingAddress)} placeholder="type here" />
            </label>
          </p>
        </div>
      </div>
      <div className="creditCardcontainer">
        <h3>Payment</h3>
        <p>
          <label>
            Credit Card
            <select>
              <option value="visa">Visa</option>
              <option value="master">Master</option>
              <option value="americanexpress">American Express</option>
            </select>
          </label>
          <label>
            Credit Card Number
            <input type="text" name="creditCard" value={creditCard} onChange={(e) => setCreditCard(e.target.value)} placeholder="type here" pattern="\d*" />
            {creditCard !== '' && !/^\d+$/.test(creditCard) && (
              <span style={{ color: 'red' }}>Please enter only numbers.</span>
            )}
          </label>
          <label>
            CVV <input type="text" name="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="###" pattern="\d*" />
          </label>
        </p>
        <p>Total Price: ${totalPrice}</p>
        <button onClick={handleSubmitOrder}>Submit Order</button>
      </div>
    </div>
  );
};

export default Checkout;

// import React, { useState, useEffect } from 'react';
// import {Link, useNavigate, useLocation} from 'react-router-dom';

// const Checkout = (props) => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const totalPrice = new URLSearchParams(location.search).get('totalPrice') || 0;

  
//     const [shippingAddress, setshippingAddress] = useState({
//       type: '',
//       number: '',
//       cvv: '',
//     });
//     const [billingAddress, setBillingAddress] = useState({
//       city: '',
//       state: '',
//       zipCode: '',
//     });
//     const [creditCard, setCreditCard] = useState('');
//     const [cvv, setCvv] = useState ('');

//     const handleInputChange = (event, setAddress) => {
//       const { name, value } = event.target;
//       setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
//     };

//     const handlesubmitOrder = () => {
//       window.alert('thank you for your order!');
//       navigate ('/');
//     }

//     return (
//       <div className = "content">
//         <h2>Checkout</h2>
//         <Link to="/cart" style={{ textDecoration: 'none', color: 'blue', margin: 16 }}>
//         Back to cart
//       </Link>
//       <div className = "side-by-side-containers">
//       <div className = "creditCardcontainer">
//         <h3>Billing Address </h3>
//         <p>
//           <label> City <input type = "text" value = {shippingAddress} onChange = {handleInputChange} placeholder = "type here"/></label>
//           <label> State <input type = "text" value = {shippingAddress} onChange = {handleInputChange} placeholder = "type here"/></label>
//           <label> ZipCode <input type = "text" value = {shippingAddress} onChange = {handleInputChange} placeholder = "type here"/></label>
//         </p>
        
//       </div>   
//       <div className = "creditCardcontainer">
//         <h3>Shipping Address</h3>
//         <p>
//           <label> City <input type = "text" value = {shippingAddress} onChange = {handleInputChange} placeholder = "type here"/></label>
//           <label> State <input type = "text" value = {shippingAddress} onChange = {handleInputChange} placeholder = "type here"/></label>
//           <label> ZipCode <input type = "text" value = {shippingAddress} onChange = {handleInputChange} placeholder = "type here"/></label>
//         </p>
//       </div>     

//       </div>
      
//       <div className = "creditCardcontainer">
//         <h3>Payment</h3>
//         <p>
//         <label>Credit Card 
//           <select>
//             <option value = "visa">Visa</option>
//             <option value = "master">Master</option>
//             <option value = "americanexpress">American Express</option>
//           </select>
//         </label>
//         <label>
//           credit card number
//           <input type = "text" value ={creditCard} onChange={handleInputChange} placeholder="type here" pattern = "\d*"
//           />
//            {creditCard !== '' && !/^\d+$/.test(creditCard) && (
//           <span style={{ color: 'red' }}>Please enter only numbers.</span>)}
//         </label>
//         <label> CVV <input type = "integer" value ={cvv} onChange = {handleInputChange} placeholder = "###" pattern = "\d*"/></label>
//         </p>
//         <p>Total Price: ${totalPrice}</p>
//         <button onClick = {handlesubmitOrder}> submit order</button>
//       </div>        
        
//       </div>
     
//     );
//   };

// export default Checkout; 