import {
  Button, TextField
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Addnrup = () => {
  const [inputs, setInputs] = useState({ dname: "", dblood: "", demail: "", dmob: "" });
  const location = useLocation();
  const navigate = useNavigate();

  const addHandler = () => {
    const { dname, dblood, demail, dmob } = inputs;
    if (!dname || !dblood || !demail || !dmob) {
      alert("Please fill out all fields.");
      return;
    }

    if (location.state?.val) {
      axios.put(`http://localhost:3008/adeditdnr/${location.state.val._id}`, inputs)
        .then((res) => {
          navigate('/adviewdnr');
        })
        .catch((err) => {
          console.error("Error updating donor:", err);
          alert("An error occurred while updating the donor.");
        });
    } else {
      axios.post("http://localhost:3008/adddnr", inputs)
        .then((res) => {
          navigate('/adviewdnr');
        })
        .catch((err) => {
          console.error("Error adding donor:", err);
          alert("An error occurred while adding the donor.");
        });
    }
  };

  useEffect(() => {
    if (location.state?.val) {
      const { dname, dblood, demail, dmob } = location.state.val;
      setInputs({ dname, dblood, demail, dmob });
    }
  }, [location.state]);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ paddingTop: "50px", marginLeft: "10px" }}>
      <h2>Blood Donate Update Form</h2>
      <TextField
        onChange={inputHandler}
        value={inputs.dname}
        placeholder='Enter your name'
        id="outlined-basic"
        name='dname'
        label="Full Name"
        variant="outlined"
      /><br /><br />
      <TextField
        onChange={inputHandler}
        value={inputs.demail}
        placeholder='Enter your email'
        id="outlined-basic"
        name='demail'
        label="Email"
        variant="outlined"
      /><br /><br />
      <TextField
        onChange={inputHandler}
        value={inputs.dmob}
        name='dmob'
        placeholder='Enter your phone number'
        id="outlined-basic"
        label="Phone number"
        variant="outlined"
      /><br /><br />
      <TextField
        onChange={inputHandler}
        value={inputs.dblood}
        name='dblood'
        placeholder='Blood Group'
        id="outlined-basic"
        label="Blood Group"
        variant="outlined"
      /><br /><br /><br />
      <Button variant="contained" onClick={addHandler} color="success">Submit</Button><br /><br />
    </div>
  );
}

export default Addnrup;
