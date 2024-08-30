import React, { useState } from "react";
import Search from "./Search/Search";
import List from "./List/List";
import axios from "axios";
import "./Home.css";

function Home() {
  const [results, setResults] = useState([]);

  // Get the token from local storage
  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  // Function to handle the search request
  const handleSearch = async (term, media = "music") => {
    try {
      const token = getToken(); // Get token from local storage
      const response = await axios.get(`http://localhost:8080/search`, {
        params: { term, media },
        headers: { Authorization: `Bearer ${token}` }, // Include JWT token in the request
      });

      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="home-container bg-dark text-white py-5">
      <div className="container">
        <h2 className="text-center mb-4">Home</h2>
        <Search onSearch={handleSearch} />
        <List results={results} />
      </div>
    </div>
  );
}

export default Home;
