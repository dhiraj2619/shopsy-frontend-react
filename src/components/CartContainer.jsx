import React, { useEffect } from 'react'
import { Box, Button, ButtonGroup, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material'
import { Add, Delete, Remove } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const CartContainer = ({ cart, onRemoveCart, onIncrementCount, onDecrementCount, total }) => {

    const[open,setOpen] = useState(false);
    const[currentProduct,setCurrentProduct] = useState(null);


     const handleClickOpen=(product)=>{
          setCurrentProduct(product)
          setOpen(true);
     }

     const handleClose=()=>{
        setCurrentProduct(null);
        setOpen(false);
     }

     const handleConfirmRemove=()=>{
         if(currentProduct){
            onRemoveCart(currentProduct.id);
            setOpen(false);
         }
     } 
     
    const navigate = useNavigate();

    useEffect(() => {
        if (cart.length === 0) {
            navigate('/emptycart')
        }
    }, [cart.length, navigate])

    const itemCount = cart.reduce((total,item)=> total + item.quantity,0);
    const shippingFee = 15;

    const orderTotal = total + shippingFee;
    return (
        <Box mt={10} px={8}>
            <Typography variant='h4' component="div" gutterBottom>
                Cart
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={8}>
                    {cart.map((item) => {
                        return (
                            <Grid item xs={12} key={item.id} mt={5}>
                                <Box display="flex" justifyContent="space-between" alignItems="center" border={1} borderColor="#ccc" p={2} borderRadius={5}>
                                    <Box width={200}>
                                        <CardMedia
                                            component="img"
                                            image={item.imagepath}
                                            alt={item.name}
                                            height={200}
                                            width={200}
                                        />
                                    </Box>
                                    <Box display="flex" flexDirection="column" ml={10}>
                                        <Typography variant='h6' component="div" >
                                            {item.name}
                                        </Typography>
                                        <Typography paragraph fontSize={16}>
                                            Rs.{item.price}
                                        </Typography>
                                    </Box>
                                    <Box ml={10}>
                                        <ButtonGroup variant='outlined' color='primary'>
                                            <Button onClick={() => item.quantity > 1 ? onDecrementCount(item.id) : handleClickOpen(item)}>
                                                <Remove />
                                            </Button>
                                            <Button>{item.quantity}</Button>
                                            <Button onClick={() => onIncrementCount(item.id)}>
                                                <Add />
                                            </Button>
                                        </ButtonGroup>
                                    </Box>
                                    <Box ml={10}>
                                        <Button variant="outlined" color="error" onClick={() => handleClickOpen(item)}>
                                            <Delete /> REMOVE
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
                <Grid item xs={12} lg={4} >
                    <Box mt={5} border={1} borderColor="#ccc" borderRadius={5}position="sticky" style={{top:'15px'}}>
                        <Box  borderBottom={1} borderColor="#ccc" p={3}>
                        <Typography variant='h6'>
                            Order Summary ({itemCount} item)
                        </Typography>
                         <Typography variant='p' color="green">
                            Overall savings    
                        </Typography> 
                        </Box>
                                           
                       <Box borderBottom={1} borderColor="#ccc" p={3} fontSize={20} >
                       <Typography variant='body1' component="div"display="flex" justifyContent="space-between" mb={1}>
                           <Box>
                           Order Value
                            </Box> 
                            <Box>
                            Rs.{total}
                            </Box>
                        </Typography>
                        <Typography variant='body1' component="div" display="flex" justifyContent="space-between">
                           <Box>
                           Shipping Fee
                            </Box> 
                            <Box>
                            Rs.{shippingFee}    
                            </Box> 
                        </Typography>
                       </Box>
                       
                       <Box p={3} >
                       <Typography variant='h6'  display="flex" justifyContent="space-between" fontWeight={400} mb={3}>
                        <Box>
                            You Pay
                        </Box>
                        <Box>
                           Rs.{orderTotal}
                        </Box>
                           
                        </Typography>
                       
                       <Box>
                        <Button variant='contained' color='primary' mt={2} style={{padding:"15px 0"}} fullWidth onClick={()=>navigate('/addressform')}>
                          Proceed to Checkout
                        </Button>
                       </Box>
                        
                       </Box>
                       
                    </Box>
                </Grid>
            </Grid>
          
          
            <Dialog open={open} onClose={handleClose} p={4}>
                <DialogTitle>Delete Item</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove {currentProduct?.name} from the cart?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='outlined' color="primary">
                        No
                    </Button>
                    <Button onClick={handleConfirmRemove} variant='contained' color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default CartContainer