import React, { useContext } from 'react'
import CartContainer from '../components/CartContainer';
import { CartContext, DECREMENT_QUANTITY, INCREMENT_QUANTITY, REMOVE_FROM_CART } from '../context/CartContext';



const Cart = () => {
    const {state,dispatch} = useContext(CartContext);

    const cart = state.cart;
    const total = state.total;

    const handleRemoveCart=(productId)=>{
        dispatch({type:REMOVE_FROM_CART,payload:productId})
    }

    const handleIncrementCount=(productId)=>{
        dispatch({type:INCREMENT_QUANTITY,payload:productId})
    }
    const handleDecrementCount=(productId)=>{
        dispatch({type:DECREMENT_QUANTITY,payload:productId})
    }

    return (
       <CartContainer cart={cart} onRemoveCart={handleRemoveCart} onIncrementCount={handleIncrementCount} onDecrementCount={handleDecrementCount} total={total}/>
    )
}

export default Cart