import React from 'react';

//bonus - when adding to the cart, think about adding a popup that gives the option to view the cart or to continue shopping 

const AddButton =({onClick, children}) => {
    return (
        <button onClick={onClick}>
            {children}
        </button>
    );
};

export default AddButton;
// import React from 'react';

// //bonus - when adding to the cart, think about adding a popup that gives the option to view the cart or to continue shopping 

// const AddButton =({onClick, children}) => {
//     const handleAddToCart = () => {
//         const addToCart = window.confirm('Do you want to view your cart or continue shopping?');

//         if (addToCart) {
//             console.log
//         }
//     }
//     return (
//         <button onClick={onClick}>
//             {children}
//         </button>
//     );
// };

// export default AddButton;