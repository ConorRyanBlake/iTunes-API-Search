import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  //Function to handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/users/add", {
        username,
        password,
      });
      setSuccess("User successfully registered!");
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError("Failed to register user");
      setSuccess("");
    }
  };

  return (
    <div className="register-container bg-dark text-white p-4 rounded">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-warning w-100">
          Register
        </button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
    </div>
  );
}

export default Register;
