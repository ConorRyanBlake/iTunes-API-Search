import React, { useState } from "react";
import "./Search.css";

function Search({ onSearch }) {
  const [term, setTerm] = useState("");
  const [media, setMedia] = useState("music"); // Default media type is music

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(term, media); // Pass both term and media type to Home
  };

  return (
    <div className="search-container mb-5">
      <h2 className="text-center mb-4">Search for Music</h2>
      <form
        onSubmit={handleSearch}
        className="d-flex flex-column align-items-center"
      >
        <div className="input-group mb-3 w-75">
          <input
            type="text"
            className="form-control"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search for an album or artist"
          />
          <select
            value={media}
            onChange={(e) => setMedia(e.target.value)}
            className="form-select"
          >
            <option value="all">All</option>
            <option value="music">Music</option>
            <option value="movie">Movie</option>
            <option value="podcast">Podcast</option>
            <option value="audiobook">Audiobook</option>
            <option value="shortFilm">Short Film</option>
            <option value="tvShow">TV Show</option>
            <option value="software">Software</option>
            <option value="ebook">Ebook</option>
          </select>
        </div>
        <button type="submit" className="btn btn-warning">
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
