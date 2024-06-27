import { Person, ShoppingCart } from '@mui/icons-material';
import { AppBar, Badge, Box, Button, Toolbar, Typography } from '@mui/material';
import React, { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
 
  const { state:authState, dispatch:authDispatch } = useContext(AuthContext);
  const {state:cartState} = useContext(CartContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post('https://shopsy-backend.onrender.com/api/user/logout');
    authDispatch({
      type: 'LOGOUT',
    });
    navigate('/');
  };

  return (
    <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ cursor: 'pointer', textDecoration: 'none', color: 'white' }}>
              Shopy
            </Link>
          </Typography>
          <Box mr={2}>
            {cartState.cart.length === 0 ? (
              <Link to="/emptycart" style={{ cursor: 'pointer', textDecoration: 'none', color: 'white' }}>
                <Badge color="error" badgeContent={cartState.cart.length}>
                  <ShoppingCart />
                </Badge>
              </Link>
            ) : (
              <Link to="/cart" style={{ cursor: 'pointer', textDecoration: 'none', color: 'white' }}>
                <Badge color="error" badgeContent={cartState.cart.length}>
                  <ShoppingCart />
                </Badge>
              </Link>
            )}
          </Box>
          <Box mt={1} ml={1}>
            {!authState.isAuthenticated ? (
              <Link to="/signup" style={{ cursor: 'pointer', textDecoration: 'none', color: 'white' }}>
                <Person />
              </Link>
            ) : (
              <Button
                type="button"
                variant="outlined"
                onClick={handleLogout}
                sx={{ borderColor: 'white', color: 'white' }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
