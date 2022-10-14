import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import OTP from "./components/OTP";
import Header from "./components/Header";
import React from "react";
import Store from "./components/Storage";
import EmailConfirmation from "./components/EmailConfirmation";
import { NotFound } from "./components/NotFound";

function App() {
  return (
    <main>
      <Store>
        <Header />
        <Routes>
          <Route path="/update-verified/:id" element={<EmailConfirmation />} />
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<Welcome />} />
          <Route path="/verification" element={<OTP />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Store>
    </main>
  );
}

export default App;
