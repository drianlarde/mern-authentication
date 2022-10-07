import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import OTP from "./components/OTP";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<Welcome />} />
          <Route path="/verification" element={<OTP />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
