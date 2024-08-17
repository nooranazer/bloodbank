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

const Adviewdnr = () => {
  const [emp, setEmp] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3008/adviewdnr")
      .then((res) => {
        setEmp(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading on error
      });
  }, []);

  const delValue = (id) => {
    axios
      .delete(`http://localhost:3008/removednr/${id}`)
      .then((res) => {
        alert(res.data.message);
        setEmp(emp.filter((item) => item._id !== id)); // Update state to remove deleted item
      })
      .catch((err) => console.log(err));
  };

  const updateValue = (val) => {
    navigate("/addnrup", { state: { val } });
  };

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "20px" }}><CircularProgress /></div>;
  }

  return (
    <div style={{ margin: "2%" }}>
      <Typography variant="h4" gutterBottom>Donor List</Typography>
      <Grid container spacing={2}>
        {emp.map((val) => (
          <Grid item xs={12} md={4} key={val._id}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Name: {val.dname}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Email: {val.demail}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Blood: {val.dblood}
                </Typography>
                <Typography variant="body2">
                  Mobile No.: {val.dmob}
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

export default Adviewdnr;
