import {applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import { loadState, saveState } from "../../utils/localstorage";
import CartReducer from "../reducers/cartReducer";


const rootReducer = combineReducers({
    cart:CartReducer
})

const persistedState = loadState();

const store = createStore(rootReducer,persistedState,applyMiddleware(thunk));

store.subscribe(()=>{
   saveState({
     cart:store.getState().cart
   })
})

export default store;