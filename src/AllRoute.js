import React, { useContext } from 'react'
import {Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Cart from './pages/Cart'
import EmptyCart from './components/EmptyCart'
import Addressform from './pages/Addressform'
import Orderconfirmed from './pages/Orderconfirmed'
import Paymentpage from './pages/Paymentpage'
import Signup from './pages/Signup'
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { AuthContext } from './context/AuthContext';


const AllRoute = () => {

  const {state} = useContext(AuthContext);
  const location = useLocation();
  console.log('AllRoute - location:', location.pathname);
  console.log('AllRoute - isAuthenticated:', state.isAuthenticated);

  const noNavbarRoutes = ['/signup','/login'];

  console.log('AllRoute - location:', location.pathname);
  console.log('AllRoute - isAuthenticated:', state.isAuthenticated);
  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/emptycart" element={<EmptyCart />} />
        
        <Route path="/addressform" element={<PrivateRoute><Addressform /></PrivateRoute>} />
        <Route path="/payments" element={<Paymentpage />} />
        <Route path="/orderconfirm" element={<Orderconfirmed />} />
        
        <Route path="/signup" element={<PublicRoute><Signup/></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
      </Routes>
    </>

  )
}

export default AllRoute