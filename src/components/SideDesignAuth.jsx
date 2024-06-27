import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const SideDesignAuth = () => {

    const location = useLocation();

    const isSignupPage = location.pathname === '/signup';
    const isLoginPage = location.pathname === '/login';
  return (
    <Box color="white" display="flex" alignItems="center" justifyContent="center" flexDirection="column" height="100%" boxShadow={20}>
    <Typography variant="h3" component="div">
      E-Shopy
    </Typography>
    <Typography variant="p" fontSize="19px" py={2} mb={5}>
      Let's Start shopping with amazing offers and discounts
    </Typography>
  
     {isSignupPage &&
  <Link to="/login">
  <Button variant="outlined" size='large' style={{ borderColor: 'white', color: 'white' }}>
    Login
  </Button>
</Link>

     }
     {isLoginPage &&
  <Link to="/signup">
  <Button variant="outlined" size='large' style={{ borderColor: 'white', color: 'white' }}>
    Create a new Account
  </Button>
</Link>
     }
    
   
  
  </Box>
  )
}

export default SideDesignAuth