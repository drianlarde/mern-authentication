import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "./Storage";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button } from "@mui/material";
import { NotFound } from "./NotFound";

function Welcome() {
  const [mainData, setMainData] = useState({});
  const [state, setState] = useContext(Context);
  const [loaderShow, setLoaderShow] = useState(true);

  useEffect(() => {
    const sendRequest = async () => {
      await axios
        .get("http://localhost:5000/api/user", { headers: { Authorization: `Bearer ${state.token}` } })
        .then((res) => {
          setState((prev) => ({ ...prev, isLoggedIn: true }));
          setMainData(res.data);
          setLoaderShow(false);
        })
        .catch((err) => {
          console.log(err);
          setLoaderShow(false);
        });
    };

    sendRequest();
  }, []);

  return (
    <>
      {!loaderShow ? (
        state.isLoggedIn ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{ textAlign: "center", fontSize: "2rem", margin: "5rem 0", maxWidth: "450px" }}>Welcome {mainData.user} 👋</h1>
            <h1 style={{ textAlign: "center", fontSize: "1rem", maxWidth: "300px", marginBottom: "1rem" }}>Console Log your User Information</h1>
            <Button
              variant="outlined"
              onClick={() => {
                console.log(mainData);
              }}
            >
              Console Log User
            </Button>
          </div>
        ) : (
          <NotFound />
        )
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default Welcome;
