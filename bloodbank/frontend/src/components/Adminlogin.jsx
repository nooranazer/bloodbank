import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';

const Adminlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill out both fields.");
      return;
    }

    axios.post('http://localhost:3008/adlogin', { email, password })
      .then(result => {
        console.log(result);
        if (result.data === "Success") {
          navigate('/admindonorf/');
        } else {
          alert("Invalid login credentials.");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ paddingTop: "90px", textAlign: "center" }}>
      <Typography variant="h5"><b>Admin Login Page</b></Typography>  
      <br/><br/>      
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/><br/>
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/><br/>
        <Button type='submit' variant="contained" color="success">
          Login
        </Button>
      </form>
      <br /><br />
      <p><b>Don't have an account?</b></p>
      <Link to="/Signup">Signup</Link>
    </div>
  );
};

export default Adminlogin;
