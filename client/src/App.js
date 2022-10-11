import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import OTP from "./components/OTP";
import Header from "./components/Header";
import React from "react";
import Store from "./components/Storage";

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
      className="notfound-main"
    >
      <h1
        style={{
          fontSize: "10rem",
          fontWeight: "bold",
        }}
      >
        404
      </h1>
      <h2 style={{ textAlign: "center" }}>Page not found</h2>

      <p
        style={{
          maxWidth: "200px",
          textAlign: "center",
          marginTop: "1rem",
          lineHeight: "1.5",
        }}
      >
        Sorry, we couldn't find the page you were looking for.
      </p>

      <a
        style={{
          textDecoration: "none",
          color: "black",
          padding: "1rem",
          backgroundColor: "lightgray",
          borderRadius: "5px",
          marginTop: "1rem",
        }}
        href="/"
      >
        Go to homepage
      </a>
    </div>
  );
}

function App() {
  return (
    <main>
      <Store>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<Welcome />} />
          <Route path="/verification" element={<OTP />} />
          {/* Route that is unknown */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Store>
    </main>
  );
}

export default App;
