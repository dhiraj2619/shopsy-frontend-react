import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import SideDesignAuth from '../components/SideDesignAuth'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [formFields, setFormFields] = useState({
     email:'',
     password:''
  });

  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange=(e)=>{
     const {name,value} = e.target;
     setFormFields({...formFields,[name]:value});
  }
  
  const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
          const response = await axios.post('https://shopsy-backend.onrender.com/api/user/login',formFields);

          
          if(response.status === 200){

            const {user,token} = response.data;
            dispatch({
              type:'LOGIN',
              payload:{
                user,
                token
              }
           })
           localStorage.setItem('authToken',response.data.token);
           localStorage.setItem('user',JSON.stringify(response.data.user))
          
           navigate('/');
          }
          else{
            navigate('/login');
             throw new Error("Invalid response from server");
          }
          
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          dispatch({
            type: 'AUTH_ERROR',
            payload: error.response.data.message
          });
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred. Please try again later.");
        }
      }
  }

  return (
    <Box>
      <Grid container height="715px">
        <Grid item md={4} bgcolor="blueviolet" style={{ borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }}>
            <SideDesignAuth/>
        </Grid>

        <Grid item md={8} bgcolor="#ffffff" container justifyContent="center" alignItems="center">
          <Box  width="500px" height="auto" p={2}>
          <Typography variant="h4" fontWeight="450" pb={5}>
                Login 
            </Typography>

          <form onSubmit={handleSubmit}>
         
            <TextField variant="outlined" margin="normal" name="email"    value={formFields.email}    onChange={handleChange} label="Email" fullWidth required></TextField>
            <TextField variant="outlined" margin="normal" name="password" value={formFields.password} onChange={handleChange} label="Password" fullWidth required></TextField>

           <Box mt={4}>
           <Button type="submit" variant="contained"  size="large" fullWidth sx={{backgroundColor:"black",color:"white"}}>Login</Button>
           </Box>
         
          </form>
          
          </Box>
        </Grid>
      </Grid>
    </Box>

  )
}

export default Login