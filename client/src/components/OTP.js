import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Context } from "./Storage";
import { NotFound } from "./NotFound";

function OTP() {
  const history = useNavigate();
  const [state, setState] = useContext(Context);
  const [otp, setOtp] = useState(1);
  const [otpFetched, setOtpFetched] = useState(0);
  const [data, setData] = useState({});
  const [email, setEmail] = useState("");
  const [expiredOtp, setExpiredOtp] = useState(false);
  const [token, setToken] = useState(state.token);
  const [ctr, setCtr] = useState(0);

  const { otpInputStyle, resendButtonStyle } = {
    otpInputStyle: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    resendButtonStyle: {},
  };

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const sendRequest = async () => {
    const res = await fetch("http://localhost:5000/api/verification", {
      method: "GET",
    });

    for (var i = 15; i > 0; --i) {
      (function (index) {
        setTimeout(function () {
          console.log(15 - index);
          setCtr(15 - index);
        }, index * 1000);
      })(i);
    }

    const data = await res.json();
    console.log(data);
    setData(data);
    setOtpFetched(data.code);
    setOtp(1);
    setExpiredOtp(false);
    setEmail(data.message.split(" ")[6]);

    setTimeout(() => {
      setOtpFetched(null);
      setExpiredOtp(true);
    }, 15000);
  };

  useEffect(() => {
    if (otp === String(otpFetched)) {
      setState((prev) => ({ ...prev, isLoggedIn: true }));
      history("/user");
    }
  }, [state, otp, history, otpFetched, setState]);

  useEffect(() => {
    sendRequest();
    console.log(state.isLoggedIn);
    console.log(state);
  }, []);

  return (
    <div>
      {token === "" ? (
        <NotFound />
      ) : (
        <div className="otp-ctn">
          <div className="otp-ctn-ctn">
            {/* <Button onClick={setEndTime(endTime)}></Button> */}
            <h1 style={{ fontWeight: "700", fontSize: "32px", color: "#11151a" }} className="otp-ctn-header">
              OTP Verification
            </h1>
            <h3 style={{ lineHeight: "1.5" }}>
              Enter the OTP you received to <span style={{ fontWeight: "500", color: "#11151a" }}>{email}</span>
            </h3>
            <div className="otpinput-ctn">
              <MuiOtpInput value={otp} onChange={handleChange} style={otpInputStyle} />
            </div>
            {expiredOtp ? (
              <Button variant="outlined" endIcon={<SendIcon />} onClick={sendRequest} style={resendButtonStyle}>
                RESEND OTP
              </Button>
            ) : (
              // <p>{seconds}</p>

              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Button disabled variant="outlined" endIcon={<SendIcon />} onClick={sendRequest} style={resendButtonStyle}>
                  RESEND OTP
                </Button>
                <p>{ctr || 15}</p>
              </Box>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default OTP;
