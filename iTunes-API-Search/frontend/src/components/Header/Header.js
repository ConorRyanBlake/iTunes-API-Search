import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({ username }) {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <nav className="container d-flex justify-content-between align-items-center">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/favorite">
              Favorite
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav d-flex flex-row">
          {username ? (
            <li className="nav-item">
              <span className="nav-link">Welcome, {username}</span>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
