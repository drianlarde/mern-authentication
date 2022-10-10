import React, { useEffect, useState } from "react";
import HeaderLogout from "./HeaderLogout";

function Welcome() {
  const [data, setData] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      const res = await fetch("http://localhost:5000/api/user", {
        method: "GET",
      });

      const data = await res.json();
      setData(data);
    };
    if (localStorage.getItem("loggedIn") === "true") {
      setLoggedIn(true);
      sendRequest();
    }
  }, []);

  return (
    <div>
      <HeaderLogout />

      <div className="welcome-ctn">
        <h1>{loggedIn ? `Welcome ${data?.user} 👋` : `Please Login First!`}</h1>
      </div>
    </div>
  );
}

export default Welcome;
