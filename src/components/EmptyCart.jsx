import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <Box px={8} mt={10}>
        <Grid container>
              <Grid item lg={12} xs={12} display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                  <Typography variant="h5">
                       Your Shopping Cart is Empty
                  </Typography>
                  <Box width={200} my={5}>
                  <img src="https://www.freepnglogos.com/uploads/shopping-bag-png/shopping-bag-plaseto-bag-plaseto-bags-manufacturer-west-bengal-17.png" alt="" width={200}/>
                  </Box>
                  <Box>
                     <Button variant='contained' color="error" onClick={()=>navigate('/')}>Contiue shopping</Button>
                  </Box>
              </Grid>
        </Grid>
    </Box>
  )
}

export default EmptyCart