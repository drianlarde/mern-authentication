import React from "react";
import { AppBar, Toolbar, Typography, Box, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <AppBar
        position="sticky"
        sx={{ marginBottom: "1rem" }}
        style={{
          backgroundColor: "#fff",
          boxShadow: "0px 1px 10px -2px rgba(0,0,0,0.1)",
          color: "#000",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            OTP
          </Typography>
          <Box>
            <Tabs textColor="inherit">
              <Tab label="Logout" component={Link} to="/login" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
