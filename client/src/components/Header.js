import React from "react";
import { AppBar, Toolbar, Typography, Box, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  // Get local Storage loggedIn
  let isLoggedIn = localStorage.getItem("loggedIn") === "true" ? true : false;

  return (
    <div>
      <AppBar
        position="sticky"
        sx={{ marginBottom: "1rem" }}
        elevation={0}
        // Change background color

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
              {isLoggedIn ? (
                <>
                  <Tab label="Logout" component={Link} to="/login" />
                </>
              ) : (
                <>
                  <Tab label="Login" component={Link} to="/login" />
                  <Tab label="Signup" component={Link} to="/signup" />
                </>
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
