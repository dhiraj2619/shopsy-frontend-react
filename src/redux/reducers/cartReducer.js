import { ADD_TO_CART, DECREMENT_QUANTITY, INCREMENT_QUANTITY, REMOVE_FROM_CART } from "../actions/cartAction";

const initialState = {
    cart:[],
    total:0
}

const cartTotal =(cart)=>{
    return cart.reduce((total,item)=>total + item.price * item.quantity,0)
}

let newCart;


const CartReducer =(state=initialState,action)=>{
    switch(action.type){
        case ADD_TO_CART:
            const existingCartItem = state.cart.find(item=>item.id === action.payload.id);
            if(existingCartItem){
                newCart = state.cart.map(item=>item.id === action.payload.id ? {...item,quantity:item.quantity + 1}:item);

            }
            else{
                newCart = [...state.cart,{...action.payload,quantity:1}]
                return {...state,
                    cart:newCart,
                    total:cartTotal(newCart)
                }
            }
    
        case REMOVE_FROM_CART:
            newCart = state.cart.filter(item=>item.id !== action.payload)
            return {...state,
                cart:newCart,
                total:cartTotal(newCart)
            }

        case INCREMENT_QUANTITY:
            newCart = state.cart.map(item=>item.id === action.payload ? {...item,quantity:item.quantity + 1}:item)

            return {...state,
                cart:newCart,
                total:cartTotal(newCart)
            }

        case DECREMENT_QUANTITY:
            newCart = state.cart.map(item=>item.id === action.payload ? {...item,quantity:item.quantity-1}:item).filter(item=>item.quantity > 0)
            return {...state,cart:newCart,total:cartTotal(newCart)}
        default:
            return state;
    }
}

export default CartReducer