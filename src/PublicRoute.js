import React, { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({children}) => {
const {state} = useContext(AuthContext);

console.log('PublicRoute - isAuthenticated:', state.isAuthenticated);
  return (
    state.isAuthenticated ? <Navigate to="/" />: children
  )
}

export default PublicRoute