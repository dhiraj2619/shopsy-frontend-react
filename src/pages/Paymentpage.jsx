import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js' 
import Checkoutform from '../components/Checkoutform';

const Paymentpage = () => {

  const stripePromise = loadStripe('pk_test_51PTIsbSAvlWVBd27RNAEIjfIwBTxqjbkzBSkGxfcLfs1EgQNFThTFnGz0v5f7yjduhyl3K3Z0x1dOKXRdnPP3lzT006tTpG4Me');

  return (
    <Elements stripe={stripePromise}>
          <Checkoutform/>
    </Elements>
  )
}

export default Paymentpage