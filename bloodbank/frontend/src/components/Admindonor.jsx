import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const View = () => {
  const [usr, setUsr] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3008/view")
      .then((res) => {
        console.log(res);
        setUsr(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const delValue = (id) => {
    axios
      .delete("http://localhost:3008/remove/" + id)
      .then((res) => {
        alert(res.data.message);
        setUsr(usr.filter(user => user._id !== id)); // Update state instead of reloading
      })
      .catch((err) => console.log(err));
  };

  const updateValue = (val) => {
    navigate("/admindonorf/", { state: { val } });
  };

  return (
    <div style={{ margin: "2%" }}>
      <br />
      <center>
        <Typography variant="h2" color={'error'}>Admin Dashboard</Typography>
        <br /><br />
        <Button variant="contained" color="success">
          <Link to={'/adviewdnr'} style={{ textDecoration: 'none', color: 'white' }}>Donor List</Link>
        </Button>
        <br /><br />
        <Button variant="contained" color="success">
          <Link to={'/adviewreq'} style={{ textDecoration: 'none', color: 'white' }}>Request List</Link>
        </Button>
      </center>
      <br /><br /><br />

      <Grid container spacing={2}>
        {usr.map(({ _id, name, blood, email, mob }, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                  Name: {name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Bloodgroup: {blood}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Email: {email}
                </Typography>
                <Typography variant="body2">
                  Mobile: {mob}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => delValue(_id)}>
                  <u>Delete</u>
                </Button>
                <Button size="small" onClick={() => updateValue({ _id, name, blood, email, mob })}>
                  <u>Update</u>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default View;
