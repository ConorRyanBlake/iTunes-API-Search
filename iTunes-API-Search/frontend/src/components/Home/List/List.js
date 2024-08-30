import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./List.css";

function List({ results }) {
  const getToken = () => sessionStorage.getItem("token");

  //Function to add a item to favorite
  const addFavorite = async (item) => {
    try {
      const token = getToken();
      if (!token) {
        alert("No token found. Please log in.");
        return;
      }

      const userId = getUserIdFromToken(token);
      const username = getUsernameFromToken(token);

      if (!userId || !username) {
        alert("Invalid token. Please log in again.");
        return;
      }

      await axios.post(
        "http://localhost:8080/favorite/add",
        {
          userId,
          username,
          albumId: item.albumId,
          albumName: item.albumName,
          artistName: item.artistName,
          albumCover: item.albumCover,
          releaseDate: item.releaseDate,
          trackName: item.trackName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Album added to favorites!"); // Success alert
    } catch (error) {
      console.error("Error adding favorite:", error);
      alert("Failed to add album to favorites. Please try again."); // Failure alert
    }
  };

  // Decode token to extract userId
  const getUserIdFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded?.id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Decode token to extract username
  const getUsernameFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded?.username;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  if (!results.length) {
    return <p>No results found.</p>;
  }

  return (
    <div className="music-list d-flex flex-wrap justify-content-center">
      {results.map((result, index) => (
        <div key={index} className="music-item card bg-dark text-white m-3">
          <img
            src={result.albumCover}
            className="card-img-top"
            alt={`${result.trackName} artwork`}
          />
          <div className="card-body">
            <h5 className="card-title">{result.trackName}</h5>
            <p className="card-text">{result.artistName}</p>
            <p className="card-text">
              {new Date(result.releaseDate).toLocaleDateString()}
            </p>
            <button
              onClick={() => addFavorite(result)}
              className="btn btn-warning w-100"
            >
              Add to Favorites
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
