import React, { useState, useContext, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "./Storage";

function Signup() {
  const [state, setState] = useContext(Context);

  useEffect(() => {
    setState((prev) => ({ ...prev, token: "" }));
    setState((prev) => ({ ...prev, isLoggedIn: false }));

    console.log(state);
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
    await axios.post("http://localhost:5000/api/login", { email: inputs.email, password: inputs.password }).then((res) => {
      if (res.data.message === "Logged in!") {
        setState((prev) => ({ ...prev, token: res.data.accessToken }));
        history("/verification");
      }
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    sendRequest();
  }

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
          <Button
            sx={{
              marginTop: "14px",
            }}
            size="medium"
            variant="contained"
            type="submit"
            fullWidth
          >
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Signup;
