import { useEffect, useReducer } from "react";
import { createContext } from "react";

const AuthContext = createContext();

const initialState = {
    isAuthenticated:false,
    user:null,
    token:null,
    cart:[],
    error:null
};

const authReducer=(state,action)=>{
   switch(action.type){
      case 'LOGIN':
        return {
             ...state,
             isAuthenticated:true,
             user:action.payload.user,
             token:action.payload.token,
             cart:action.payload.cart || [],
             error:null
        }
      
      case 'LOGOUT':
         return {
              ...state,
              isAuthenticated:false,
              user:null,
              token:null,
              cart:[],
              error:null
         }
      case 'AUTH_ERROR':
        return{
            ...state,
            error:action.payload
        }
      default:
        return state;
   }
}

const AuthProvider =({children})=>{
    
    const [state,dispatch] = useReducer(authReducer,initialState,(initial)=>{
       const token = localStorage.getItem('authToken');
       const user = localStorage.getItem('user');
       const cart = localStorage.getItem('cart');

       if(token && user){
          return{
            ...initial,
            isAuthenticated:true,
            token,
            user:JSON.parse(user),
            cart:cart ? JSON.parse(cart):[]
          }
       }

       return initial;
    });

    useEffect(()=>{
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');
        const cart = localStorage.getItem('cart');

        if(user && token){
           dispatch({
             type:'LOGIN',
             payload:{
               token,
               user:JSON.parse(user),
               cart:cart ? JSON.parse(cart):[]
             }
           })
        }
    },[]);

    useEffect(()=>{
       localStorage.setItem('authToken',state.token);
       localStorage.setItem('user',JSON.stringify(state.user));
       localStorage.setItem('cart',JSON.stringify(state.cart));

    },[state.token,state.user,state.cart]);

    return (
        <AuthContext.Provider value={{state,dispatch}}>
             {children}
        </AuthContext.Provider>
    )
}

export {AuthContext,AuthProvider}