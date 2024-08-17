import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Adviewreq = () => {
  const [emp, setEmp] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3008/adviewreq")
      .then((res) => {
        setEmp(res.data);
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading on error
      });
  }, []);

  const delValue = (id) => {
    axios
      .delete(`http://localhost:3008/removereq/`)
      .then((res) => {
        alert(res.data.message);
        setEmp(emp.filter((item) => item._id !== id)); // Update state to remove deleted item
      })
      .catch((err) => console.log(err));
  };

  const updateValue = (val) => {
    navigate("/adrequp", { state: { val } });
  };

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "20px" }}><CircularProgress /></div>;
  }

  return (
    <div style={{ margin: "2%" }}>
      <Typography variant="h4" gutterBottom>Request List</Typography>
      <Grid container spacing={2}>
        {emp.map((val) => (
          <Grid item xs={12} md={4} key={val._id}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Name: {val.rname}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Email: {val.remail}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Blood: {val.rblood}
                </Typography>
                <Typography variant="body2">
                  Mobile No.: {val.rmob}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="error" onClick={() => delValue(val._id)}>
                  Delete
                </Button>
                <Button size="small" color="primary" onClick={() => updateValue(val)}>
                  Update
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Adviewreq;
