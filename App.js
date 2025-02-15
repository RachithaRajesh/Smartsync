import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import SearchBar from "./components/SearchBar";
import Dashboard3D from "./components/DashBoard3D";

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const modelFiles = ["building_model-1.glb", "building_model-2.glb", "building_model-3.glb", "building_model-4.glb", "building_model-5.glb", "building_model-6.glb"];
  const getRandomModel = () => modelFiles[Math.floor(Math.random() * modelFiles.length)];


  return (
    <div>
      {!showSearch ? (
        <WelcomeScreen onStart={() => setShowSearch(true)} />
      ) : !selectedCity ? (
        <SearchBar onSelectCity={(city) => setSelectedCity(city)} />
      ) : (
        <Dashboard3D city={selectedCity} modelFile={getRandomModel()} />
      )}
    </div>
  );
}

export default App;
