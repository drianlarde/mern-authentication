import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useNavigate } from "react-router-dom";

function OTP() {
  const history = useNavigate();

  const [otp, setOtp] = React.useState(1);
  const [otpFetched, setOtpFetched] = React.useState(0);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const sendRequest = async () => {
    const res = await fetch("http://localhost:5000/api/verification", {
      method: "GET",
    });

    const data = await res.json();
    console.log(data);
    setOtpFetched(data.code);
  };

  React.useEffect(() => {
    if (otp === String(otpFetched)) {
      localStorage.setItem("loggedIn", true);
      history("/user");
    }
  }, [otp, history, otpFetched]);

  React.useEffect(() => {
    sendRequest();
  }, []);

  return (
    <div>
      <div className="otp-ctn">
        <h1>Verification</h1>
        <MuiOtpInput value={otp} onChange={handleChange} />
      </div>
    </div>
  );
}

export default OTP;
