import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import "./DashBoard3D.css";
import * as vision from "@mediapipe/tasks-vision";

const Building = ({ modelFile, position, city }) => {
  const { scene } = useGLTF(`/models/${modelFile}`);
  return (
    <mesh position={position} scale={[1.5, 1.5, 1.5]}>
      <primitive object={scene} scale={0.5} />
      <Html position={[0, 2, 0]}>
        <div className="tooltip">{city.name}</div>
      </Html>
    </mesh>
  );
};

const Dashboard3D = ({ city, modelFile = "building_model.glb" }) => {
  const getBackgroundColor = () => {
    if (city.temperature > 30) return "#ff4d4d";
    if (city.temperature < 15) return "#4da6ff";
    return "#1a1a2e";
  };

  return (
    <div className="dashboard-container" style={{ backgroundColor: getBackgroundColor() }}>
      <h2>{city.name} Dashboard</h2>
      <Canvas camera={{ position: [0, 5, 12], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Suspense fallback={<Html>Loading Model...</Html>}>
        <Building modelFile={modelFile} position={[0, -1, 0]} city={city} />
          <OrbitControls />
        </Suspense>
      </Canvas>
      <div className="data-panel">
        <p>🌡 Temperature: {city.temperature}°C</p>
        <p>💨 Air Quality: {city.airQuality}</p>
        <p>💧 Humidity: {city.humidity}%</p>
        <p>🌱 Soil Moisture: {city.soilMoisture}%</p>
      </div>
    </div>
  );
};

export default Dashboard3D;
