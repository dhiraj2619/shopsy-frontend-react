import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

const initialState = {
    cart: [],
    total: 0
}

const CartContext = createContext();

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY'
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY'
export const SET_CART = 'SET_CART'

const cartTotal = (cart) => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
}

const CartReducer = (state, action) => {
    let newCart;

    switch (action.type) {
        case ADD_TO_CART:
            const existingCartItem = state.cart.find(item => item.id === action.payload.id);
            if (existingCartItem) {
                newCart = state.cart.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item);
            } else {
                newCart = [...state.cart, { ...action.payload, quantity: 1 }];
            }
            return { ...state, cart: newCart, total: cartTotal(newCart) };

        case REMOVE_FROM_CART:
            newCart = state.cart.filter(item => item.id !== action.payload);
            return { ...state, cart: newCart, total: cartTotal(newCart) };

        case INCREMENT_QUANTITY:
            newCart = state.cart.map(item => item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item);
            return { ...state, cart: newCart, total: cartTotal(newCart) };

        case DECREMENT_QUANTITY:
            newCart = state.cart.map(item => item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0);
            return { ...state, cart: newCart, total: cartTotal(newCart) };

        case SET_CART:
            return {...state,cart:action.payload,total:cartTotal(action.payload)}
        default:
            return state;
    }
}

const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(CartReducer, initialState);

    useEffect(()=>{
       const fetchCart=async()=>{
             try {
                const response = await axios.get('https://shopsy-backend.onrender.com/api/user/cart',{headers:{'x-auth-token':localStorage.getItem('authToken')}});
                dispatch({type:SET_CART,payload:response.data});

             } catch (error) {
                 console.error("Error fetching cart:", error);
             }
       }
       fetchCart();
    },[])

    useEffect(()=>{
       if(state.cart.length > 0){
         axios.post('https://shopsy-backend.onrender.com/api/user/cart/update',state.cart,{headers:{'x-auth-token':localStorage.getItem('authToken')}});
       }
    },[state.cart])

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }
