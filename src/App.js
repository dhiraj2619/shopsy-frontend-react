import React from 'react'
import AllRoute from './AllRoute'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

const App = () => {
  return (
    <>
      <AllRoute/>
      <ToastContainer/>
    </>
  )
}

export default App