import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import SideDesignAuth from '../components/SideDesignAuth'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [formFields, setFormFields] = useState({
     name:'',
     email:'',
     password:''
  });

  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange=(e)=>{
      const {name,value} = e.target;
      setFormFields({...formFields,[name]:value});
  }

  const handleOnSubmit=async(e)=>{
     e.preventDefault();
     try {
        const response = await axios.post('https://shopsy-backend.onrender.com/api/user/register',formFields);
        console.log('Server response:', response);
        if (response && response.data) {
          dispatch({
            type: 'LOGIN',
            payload: {
              user: response.data.user,
              token: response.data.token
            }
          });
          navigate('/login');
          toast.success("User registration successful");
        } else {
          throw new Error('Invalid response from server');
        }
     } catch (error) {
        dispatch({
           type:'AUTH_ERROR',
           payload:error.response.data.message
        })
        toast.error(error.response.data.message);
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
                Create Account
            </Typography>

          <form onSubmit={handleOnSubmit}>
          <TextField variant="outlined" margin="normal"  name="name"  value={formFields.name} onChange={handleChange}  label="Name" fullWidth required></TextField>
            <TextField variant="outlined" margin="normal" name="email" value={formFields.email} onChange={handleChange} label="Email" fullWidth required></TextField>
            <TextField variant="outlined" margin="normal" name="password" value={formFields.password} onChange={handleChange} label="Password" fullWidth required></TextField>

           <Box mt={4}>
           <Button type="submit" variant="contained"  size="large" fullWidth sx={{backgroundColor:"black",color:"white"}}>Create account</Button>
           </Box>
         
          </form>
          
          </Box>
        </Grid>
      </Grid>
    </Box>

  )
}

export default Signup