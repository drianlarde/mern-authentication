import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

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
    console.log(otp, otpFetched);
    if (otp == String(otpFetched)) {
      console.log("OTP Verified");
      history("/user");
    }
  }, [otp]);

  React.useEffect(() => {
    sendRequest();
  }, []);

  return (
    <div>
      <Header />

      <div className="otp-ctn">
        <h1>Verification</h1>
        <MuiOtpInput value={otp} onChange={handleChange} />
      </div>
    </div>
  );
}

export default OTP;
