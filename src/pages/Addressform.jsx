import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddressForm = () => {

    const [formFields, setFormFields] = useState({
        title:'',
        firstname:'',
        lastname:'',
        email:'',
        mobile:'',
        flatnumber:'',
        address:'',
        landmark:'',
        pincode:'',
        city:'',
        state:''
    })

    const handleChange=(e)=>{
        const {name,value} = e.target;
        setFormFields({...formFields,[name]:value});
    }

    const navigate = useNavigate();

    const handleSubmit=(e)=>{
          e.preventDefault();
          console.log(formFields);
         navigate('/payments');      
    }

    return (
        <Box mt={10} px={8}>
            <Grid container spacing={3}>
                <Grid item lg={8} xs={12} border={1} borderColor="#ccc" p={3} borderRadius={5}>
                    <Typography variant="h6" component="div" py={2}>
                        Checkout
                    </Typography>
                    <Typography variant="body1" fontSize={17} py={2}>
                        Please enter your delivery address, so we can deliver your order.
                    </Typography>
                    <Typography variant="h6" component="div" fontSize={19} color="gray" mt={4}>
                        Contact details*
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={12} md={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Title</InputLabel>
                                    <Select label="Title" name="title"  onChange={handleChange} value={formFields.title}>
                                        <MenuItem value={'Mr'}>Mr</MenuItem>
                                        <MenuItem value={'Mrs'}>Mrs</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="First Name" margin="normal" name="firstname" variant='outlined' onChange={handleChange} value={formFields.firstname} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Last Name" margin="normal" name="lastname" variant='outlined' value={formFields.lastname} onChange={handleChange}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Email" margin="normal" name="email" variant='outlined' onChange={handleChange} value={formFields.email}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Mobile No" margin="normal" name="mobile" variant='outlined' value={formFields.mobile} onChange={handleChange} />
                            </Grid>
                        </Grid>
                        <Typography variant='h6' color="gray" mt={4} fontSize={19}>
                            Address details*
                        </Typography>
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Flat, House No" margin="normal" name="flatnumber" value={formFields.flatnumber} onChange={handleChange} variant='outlined' />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Address" margin="normal" name="address" value={formFields.address} onChange={handleChange} variant='outlined' />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Landmark" margin="normal" name="landmark" onChange={handleChange} value={formFields.landmark} variant='outlined' />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Pincode" margin="normal" name="pincode" value={formFields.pincode} onChange={handleChange} variant='outlined' />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="city" margin="normal" name="city" variant='outlined' value={formFields.city} onChange={handleChange}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="State" margin="normal" name="state" onChange={handleChange} value={formFields.state} variant='outlined' />
                            </Grid>
                            <Grid item xs={12} mt={5}>
                                <Button type="submit" variant='contained' color='primary' fullWidth style={{ padding: "15px 0" }}>
                                    Add Address
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddressForm
