import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Favorites from "./components/Favorites/Favorites";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  const [username, setUsername] = useState("");

  const handleLogin = (username) => {
    setUsername(username);
  };

  return (
    <Router>
      <div>
        <Header username={username} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorites />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
