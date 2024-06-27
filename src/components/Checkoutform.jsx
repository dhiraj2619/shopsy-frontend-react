import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

const Checkoutform = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit=async(event)=>{
        event.preventDefault();
        setLoading(true);

        if(!stripe || !elements){
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
        if (error) {
            setErrorMessage(error.message);
            setLoading(false);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
           
            setLoading(false);
        }
    }
  return (
    <Box mt={5}>
    <Typography variant="h5" component="div" gutterBottom>
        Complete your purchase
    </Typography>
    <form onSubmit={handleSubmit}>
        <CardElement />
        <Box mt={3}>
            <Button type="submit" variant="contained" color="primary" disabled={!stripe || loading} fullWidth>
                {loading ? <CircularProgress size={24} /> : 'Pay'}
            </Button>
        </Box>
    </form>
    {errorMessage && (
        <Typography color="error" variant="body2" mt={2}>
            {errorMessage}
        </Typography>
    )}
</Box>
  )
}

export default Checkoutform