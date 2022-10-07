import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Signup() {
  React.useEffect(() => {
    // Set localStorage loggedIn to false
    localStorage.setItem("loggedIn", false);
  }, []);

  const history = useNavigate();
  const [inputs, setInputs] = useState({
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
    const res = await axios.post("http://localhost:5000/api/login", { email: inputs.email, password: inputs.password }).catch((err) => console.log(err));
  };

  function handleSubmit(e) {
    e.preventDefault();

    sendRequest().then(() => {
      history("/verification");
    });
  }

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <Box marginLeft="auto" marginRight="auto" maxWidth={300} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography variant="h5">Login</Typography>
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
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Signup;
