import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  const [inputs, setInputs] = useState({ name: "", blood: "", email: "", mob: "" });
  const location = useLocation();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addHandler = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!inputs.name || !inputs.blood || !inputs.email || !inputs.mob) {
      alert("Please fill out all fields.");
      return;
    }

    const apiUrl = location.state !== null
      ? `http://localhost:3008/edit/${location.state.val._id}`
      : "http://localhost:3008/addr";

    const method = location.state !== null ? axios.put : axios.post;

    method(apiUrl, inputs)
      .then((res) => {
        console.log(res);
        navigate('/admindonor');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (location.state !== null) {
      setInputs(location.state.val);
    }
  }, [location.state]);

  return (
    <div style={{ marginTop: "3%", textAlign: "center" }}>
      <Typography variant="h5"><b>Donor Form</b></Typography>  
      <br/><br/>      
      <form onSubmit={addHandler}>
        <TextField onChange={inputHandler} id="outlined-basic" label="Name" variant="outlined" name="name" value={inputs.name} /><br/><br/>
        <TextField onChange={inputHandler} id="outlined-basic" label="Blood Group" variant="outlined" name="blood" value={inputs.blood} /><br/><br/>
        <TextField onChange={inputHandler} id="outlined-basic" label="Email" variant="outlined" name="email" value={inputs.email} /><br/><br/>
        <TextField onChange={inputHandler} id="outlined-basic" label="Phone Number" variant="outlined" name="mob" value={inputs.mob} /><br/><br/>
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Add;
