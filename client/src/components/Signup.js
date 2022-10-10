import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Signup() {
  const history = useNavigate();
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

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/signup", { name: inputs.name, email: inputs.email, password: inputs.password })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  function handleSubmit(e) {
    e.preventDefault();
    // Send http request to backend
    sendRequest().then(() => {
      history("/login");
    });
  }

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <Box marginLeft="auto" marginRight="auto" maxWidth={300} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
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
          />

          <Button size="small" variant="contained" type="submit">
            Signup
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Signup;
