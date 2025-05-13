import React, { useEffect, useState } from "react";
import "./WelcomeScreen.css"; // Import the CSS file

const WelcomeScreen = ({ onStart }) => {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    setTimeout(() => setBounce(true), 500); // Start animation after 0.5s
  }, []);

  return (
    <div className="welcome-container">
      {/* Overlay for better readability */}
      <div className="overlay"></div>

      {/* Particles Animation */}
      <div className="particles"></div>

      {/* Headline Section */}
      <div className="headline-section">
        <h1 className={`welcome-text ${bounce ? "bounce" : ""}`}>
          WELCOME TO <span className="highlight">SMARTSYNC</span>
        </h1>
        <p className="subheading">A Smarter View for Smarter Cities</p>
      </div>

      {/* Arrow for navigation */}
      <div className="arrow-container" onClick={onStart}>
        <div className="arrow"></div>
      </div>
    </div>
  );
};

export default WelcomeScreen;