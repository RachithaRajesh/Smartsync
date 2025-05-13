import React, { useState, useEffect } from "react";
import cityData from "../assests/cityData.json";
import "./SearchBar.css";

const SearchBar = ({ onSelectCity }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length >= 1) {
      const filtered = cityData.filter((city) =>
        city?.name?.toLowerCase().startsWith(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 15)); // Show up to 15 suggestions
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div className="fullscreen-background">
      {/* Logo and Tagline */}
      <div className="logo-container">
        <h1 className="logo-text">
          SMARTSYNC
        </h1>
        <p className="tagline">A Smarter View for Smarter Cities</p>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value || "")}
          className="search-input"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((city) => (
              <li key={city.id} onClick={() => onSelectCity(city)}>
                {city.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;