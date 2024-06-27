import {toast} from 'react-toastify';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';


export const handleAddToCart=(product)=>{
    return(dispatch)=>{
        dispatch({type:ADD_TO_CART,payload:product})
        toast.success(`${product.name} is added to cart`)
    }
}

export const handleRemoveFromCart=(productId)=>{
    return(dispatch)=>{
        dispatch({type:REMOVE_FROM_CART,payload:productId})
    }
}

export const handleIncrementCount=(product)=>{
    return(dispatch)=>{
       dispatch({type:INCREMENT_QUANTITY,payload:product})
    }
}

export const handleDecrementCount=(product)=>{
   return(dispatch)=>{
      dispatch({type:DECREMENT_QUANTITY,payload:product})
   }
}
