import React, {useState, createContext, useEffect} from 'react';

import { addItemToCart, 
    removeItemFromCart, 
    filterItemsFromCart,
    getcartTotal, 
    getCartItemsCount} from './cart.utils';

export const CartContext = createContext({
    hidden: true,
    toggleHidden:() => {},
    cartItems:[],
    addItem: () => {},
    removeItem: () => {},
    clearItemsFromCart: () => {},
    cartItemsCount: 0,
    cartTotal: 0
});

const CartProvider = ({ children }) => {
    const [hidden, setHidden] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setcartItemsCount] = useState(0);
    const [cartTotal,setCartTotal] = useState(0);

    const toggleHidden = () => setHidden(!hidden);
    const addItem = item => setCartItems(addItemToCart(cartItems,item));
    const removeItem = item => setCartItems(removeItemFromCart(cartItems,item));
    const clearItemsFromCart = item => setCartItems(filterItemsFromCart(cartItems, item));
    
    useEffect(()=>{
        setcartItemsCount(getCartItemsCount(cartItems));
        setCartTotal(getcartTotal(cartItems))
    }, [cartItems])

    return(
        <CartContext.Provider value={{
            hidden,
            toggleHidden,
            cartItems,
            addItem,
            removeItem,
            cartItemsCount,
            clearItemsFromCart,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;