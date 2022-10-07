import React, { useEffect, useState } from "react";
import HeaderLogout from "./HeaderLogout";

function Welcome() {
  const [data, setData] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      const res = await fetch("http://localhost:5000/api/user", {
        method: "GET",
      });

      const data = await res.json();
      setData(data);
    };

    sendRequest();
  }, []);

  return (
    <div>
      <HeaderLogout />

      <div className="welcome-ctn">
        <h1>Welcome {data?.user} 👋</h1>
      </div>
    </div>
  );
}

export default Welcome;
