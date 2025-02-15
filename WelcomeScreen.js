import React, { useEffect, useState } from "react";
import "./WelcomeScreen.css";

const WelcomeScreen = ({ onStart }) => {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    setTimeout(() => setBounce(true), 500); // Start animation after 0.5s
  }, []);

  return (
    <div className="welcome-container" onClick={onStart}>
      <h1 className={`welcome-text ${bounce ? "bounce" : ""}`}>
        WELCOME TO <span className="highlight">SMARTSYNC</span>
      </h1>
      <p className="click-text">Click anywhere to continue...</p>
    </div>
  );
};

export default WelcomeScreen;
