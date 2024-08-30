import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Favorite.css";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch favorites
  const fetchFavorites = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("No token found");
        return;
      }

      const response = await axios.get("http://localhost:8080/favorite", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavorites(response.data);
    } catch (err) {
      console.error("Error fetching favorites:", err);
      setError("Failed to fetch favorites.");
    }
  };

  // Function to remove a favorite
  const removeFavorite = async (favoriteId) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/favorite/remove/${favoriteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Update the list of favorites after deletion
      setFavorites(favorites.filter((favorite) => favorite._id !== favoriteId));
    } catch (error) {
      console.error("Error deleting favorite:", error);
      setError("Failed to delete favorite");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="favorite-container bg-dark text-white py-5">
      <h2 className="text-center mb-4">My Favorites</h2>
      <div>
        {favorites.length === 0 ? (
          <p>No favorites found.</p>
        ) : (
          <div className="favorite-list d-flex flex-wrap justify-content-center">
            {error && <p className="error-message">{error}</p>}
            {favorites.map((favorite) => (
              <div
                key={favorite._id}
                className="favorite-item card bg-dark text-white m-3"
              >
                <img
                  src={favorite.albumCover}
                  className="card-img-top"
                  alt={`${favorite.trackName} artwork`}
                />
                <div className="card-body">
                  <h3 className="card-title">{favorite.trackName}</h3>
                  <p className="card-text">{favorite.artistName}</p>
                  <p className="card-text">
                    {new Date(favorite.releaseDate).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => removeFavorite(favorite._id)}
                    className="btn btn-warning w-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
