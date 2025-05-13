import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import SearchBar from "./components/SearchBar";
import DashBoard3D from "./components/DashBoard3D";

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  // Handle city selection from SearchBar
  const handleSelectCity = (city) => {
    setSelectedCity(city);
  };

  return (
    <div>
      {/* Show WelcomeScreen initially */}
      {!showSearch ? (
        <WelcomeScreen onStart={() => setShowSearch(true)} />
      ) : !selectedCity ? (
        // Show SearchBar if no city is selected
        <SearchBar onSelectCity={handleSelectCity} />
      ) : (
        // Show DashBoard3D after a city is selected
        <DashBoard3D city={selectedCity} />
      )}
    </div>
  );
}

export default App;