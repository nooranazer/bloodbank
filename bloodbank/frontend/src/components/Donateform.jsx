import {
  Button,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Donateform = () => {
  const [inputs, setInputs] = useState({ dname: "", dblood: "", demail: "", dmob: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state !== null) {
      setInputs({
        dname: location.state.val.dname,
        dblood: location.state.val.dblood,
        demail: location.state.val.demail,
        dmob: location.state.val.dmob,
      });
    }
  }, [location]);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addHandler = () => {
    setLoading(true);
    setError(null);

    if (location.state !== null) {
      axios.put(`http://localhost:3008/adeditdnr}`, inputs)
        .then((res) => {
          navigate('/donorview');
        })
        .catch((err) => {
          setError("Failed to update donor information. Please try again.");
          console.log(err);
        })
        .finally(() => setLoading(false));
    } else {
      axios.post("http://localhost:3008/adddnr", inputs)
        .then((res) => {
          navigate('/dash');
        })
        .catch((err) => {
          setError("Failed to submit donation information. Please try again.");
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div style={{ paddingTop: "50px", marginLeft: "10px" }}>
      <h2>Donate Blood</h2><center>
      <TextField 
        onChange={inputHandler}
        value={inputs.dname}
        placeholder='Enter your name'
        name='dname'
        label="Full Name"
        variant="outlined"
        
      /><br/><br/>
      <TextField
        onChange={inputHandler}
        value={inputs.demail}
        placeholder='Enter your email'
        name='demail'
        label="Email"
        variant="outlined"
        
      /><br/><br/>
      <TextField
        onChange={inputHandler}
        value={inputs.dmob}
        placeholder='Enter your phone number'
        name='dmob'
        label="Phone Number"
        variant="outlined"
        
      /><br/><br/>
      <TextField
        onChange={inputHandler}
        value={inputs.dblood}
        placeholder='Enter your blood group'
        name='dblood'
        label="Blood Group"
        variant="outlined"
       
      /></center><br/>
      
      {loading ? (
        <CircularProgress />
      ) : (
        <Button variant="contained" onClick={addHandler} color="success">
          {location.state ? "Update Donor Information" : "Submit Donation"}
        </Button>
      )}

      {error && (
        <Alert severity="error" style={{ marginTop: "20px" }}>
          {error}
        </Alert>
      )}

      <br /><br />
      <Link to="/donorview">View Donor</Link>
    </div>
  );
};

export default Donateform;
