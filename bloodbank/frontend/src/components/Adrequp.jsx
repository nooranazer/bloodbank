import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Adrequp = () => {
  const [inputs, setInputs] = useState({ rname: "", rblood: "", remail: "", rmob: "" });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state !== null) {
      setInputs({
        rname: location.state.val.rname,
        rblood: location.state.val.rblood,
        remail: location.state.val.remail,
        rmob: location.state.val.rmob,
      });
    }
  }, [location.state]);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addHandler = () => {
    if (!inputs.rname || !inputs.rblood || !inputs.remail || !inputs.rmob) {
      alert("All fields are required.");
      return;
    }

    const request = location.state !== null 
      ? axios.put(`http://localhost:3008/addrequp/${location.state.val._id}`, inputs) 
      : axios.post("http://localhost:3008/addreq/", inputs);

    request
      .then((res) => {
        console.log(res);
        navigate('/adviewreq');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ paddingTop: "50px", marginLeft: "10px" }}>
      <Typography variant="h4">Blood Request Update Form</Typography>
      <TextField
        onChange={inputHandler}
        value={inputs.rname}
        placeholder='Enter your name'
        id="outlined-basic"
        name='rname'
        label="Full Name"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        onChange={inputHandler}
        value={inputs.remail}
        placeholder='Enter your email'
        id="outlined-basic"
        name='remail'
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        onChange={inputHandler}
        value={inputs.rmob}
        placeholder='Enter your phone number'
        id="outlined-basic"
        name='rmob'
        label="Phone Number"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        onChange={inputHandler}
        value={inputs.rblood}
        placeholder='Blood Group'
        id="outlined-basic"
        name='rblood'
        label="Blood Group"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="success"
        onClick={addHandler}
        style={{ marginTop: "20px" }}
      >
        Submit
      </Button>
    </div>
  );
};

export default Adrequp;
