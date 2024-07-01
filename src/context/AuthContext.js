import { useEffect, useReducer } from "react";
import { createContext } from "react";

const AuthContext = createContext();

const initialState = {
    isAuthenticated:false,
    user:null,
    token:null,
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
             error:null
        }
      
      case 'LOGOUT':
         return {
              ...state,
              isAuthenticated:false,
              user:null,
              token:null,
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
      

       if(token && user){
          return{
            ...initial,
            isAuthenticated:true,
            token,
            user:JSON.parse(user),
          }
       }

       return initial;
    });

    useEffect(()=>{
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');
     

        if(user && token){
           dispatch({
             type:'LOGIN',
             payload:{
               token,
               user:JSON.parse(user)
             }
           })
        }
    },[]);

    useEffect(()=>{
       localStorage.setItem('authToken',state.token);
       localStorage.setItem('user',JSON.stringify(state.user));
      

    },[state.token,state.user]);

    return (
        <AuthContext.Provider value={{state,dispatch}}>
             {children}
        </AuthContext.Provider>
    )
}

export {AuthContext,AuthProvider}