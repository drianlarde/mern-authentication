import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";

function Signup() {
  const history = useNavigate();
  const [data, setData] = useState({});

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendRequest();
  }

  function newEmailVerification() {
    axios.post("http://localhost:5000/api/update-verified/send-email", { email: inputs.email }).then((res) => {});
  }

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/api/signup", { name: inputs.name, email: inputs.email, password: inputs.password })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        newEmailVerification();

        setTimeout(() => {
          history("/login");
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          margin: "0 2rem",
        }}
        onSubmit={handleSubmit}
      >
        <Box maxWidth="200px">
          <Typography variant="h5">Signup</Typography>

          <TextField
            size="small"
            name="name"
            onChange={handleChange}
            value={inputs.name}
            type="text"
            label="Name"
            placeholder="Name"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            fullWidth
          />
          <TextField
            size="small"
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type="email"
            label="Email"
            placeholder="Email"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            fullWidth
          />
          <TextField
            size="small"
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type="password"
            label="Password"
            placeholder="Password"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            fullWidth
          />

          <Button sx={{ marginTop: "14px" }} size="small" variant="contained" type="submit" fullWidth>
            Signup
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Signup;
