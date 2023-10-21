// Search.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirigez l'utilisateur vers la page de résultats de recherche
    navigate(`/search?q=${searchTerm}`);
  };

  return (
    <div>
      <div className="header-search">
        <form onSubmit={handleSearch}>
         
          <div className="header-search-wrapper">
            <label htmlFor="q" className="sr-only">
              Search
            </label>
            <input
              type="search"
              className="form-control"
              name="q"
              id="q"
              placeholder="Search in..."
              required
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="search-toggle">
            <i className="icon-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
