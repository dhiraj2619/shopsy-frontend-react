import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
// import { Products } from '../data/Data'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ADD_TO_CART, CartContext } from '../context/CartContext'
import axios from 'axios'

const ProductList = () => {
  
    const [products,setProducts] = useState([]);


    useEffect(()=>{
       const fetchProducts=async()=>{
        try {
            const response = await axios.get('https://shopsy-backend.onrender.com/api/products/allproducts');
            setProducts(response.data);
        } catch (error) {
            console.error("error fetching products",error);
        }
    }
    fetchProducts();
    },[]);
    const navigate = useNavigate();

   const {state,dispatch} = useContext(CartContext);
    
    const isItemInCart =(productId)=>{
        return Array.isArray(state.cart) && state.cart.some(item => item.id === productId);
    }

    const AddToCart=async(product)=>{
        try {
             await axios.post('https://shopsy-backend.onrender.com/api/user/cart/add',{productId:product._id},{
                headers:{
                    'x-auth-token':localStorage.getItem('authToken')
                }
             });
             dispatch({type:ADD_TO_CART,payload:product})
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
       
    }
    return (
        <Box mt={10} px={8}>
            <Grid container spacing={5}>
                {products.map((product) => {
                    return (
                        <Grid item xs={12} md={3} key={product.id} >
                            <Card border='1' borderColor='#ccc'>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image={`https://shopsy-backend.onrender.com/${product.imagepath.replace(/\\/g, "/")}`}
                                        alt="green iguana"
                                        height={300}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            Rs.{product.price}
                                        </Typography>
                                    </CardContent>
                                <Box mb={3} ml={2}>
                                <Button  variant={isItemInCart(product.id)?'outlined':'contained'} color={isItemInCart(product.id)?"secondary":"primary"} onClick={()=>{
                                    if(!isItemInCart(product.id)){
                                      AddToCart(product);
                                    }
                                    else{
                                        navigate('/cart');              
                                    }
                                }}>
                                     {isItemInCart(product.id)?'go to cart':'Add to cart'}
                                </Button>
                                </Box>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })}

            </Grid>
        </Box>
    )
}

export default ProductList