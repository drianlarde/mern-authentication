import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

function ForgotPassword() {
  const [inputs, setInputs] = useState({
    email: "",
  });

  function handleChange(e) {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/forgot-password", { email: inputs.email })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
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
  );
}

export default ForgotPassword;
