import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "./Storage";

function Welcome() {
  const [mainData, setMainData] = useState({});
  const [state, setState] = useContext(Context);

  useEffect(() => {
    const sendRequest = async () => {
      await axios.get("http://localhost:5000/api/user", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then((res) => {
        setMainData(res.data);
      });
    };

    sendRequest();
    setState((prev) => ({ ...prev, isLoggedIn: true }));
  }, [setState]);

  return (
    <div>
      <p>{state.isLoggedIn ? `Welcome ${mainData.user}` : "Please login to view this page"}</p>
      <div className="welcome-ctn">
        <h1>{`Welcome ${mainData.user} 👋`}</h1>
        {/* <h1>{loggedIn ? `Welcome ${data?.user} 👋` : `Please Login First!`}</h1> */}
      </div>
      <button
        style={{
          padding: "10px",
          backgroundColor: "#0a0a0a",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => {
          console.log(mainData);
        }}
      >
        Console Log User
      </button>
    </div>
  );
}

export default Welcome;
