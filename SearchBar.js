import React, { useState, useEffect } from "react";
import cityData from "../assets/cityData.json";
import "./SearchBar.css";

const SearchBar = ({ onSelectCity }) => {
  const [query, setQuery] = useState("");  
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length >= 1) {  
      const filtered = cityData.filter((city) =>
        city?.name?.toLowerCase().startsWith(query.toLowerCase())  // Match all cities starting with the letter
      );
      setSuggestions(filtered.slice(0, 15)); // Show up to 15 suggestions
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value || "")} 
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
  );
};

export default SearchBar;
