import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import "chart.js/auto";
import "./DashBoard3D.css";
import { FaThermometerHalf, FaLungs, FaTint, FaSeedling } from "react-icons/fa";
import { database, ref } from "../firebase"; // Import Firebase utilities
import { onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import axios from "axios";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsNKwfVvwZz8ba94iEdixfA6LSNzPN_YQ",
  authDomain: "smartsync-d5140.firebaseapp.com",
  databaseURL: "https://smartsync-d5140-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smartsync-d5140",
  storageBucket: "smartsync-d5140.firebasestorage.app",
  messagingSenderId: "773909208327",
  appId: "1:773909208327:web:a5d33a9307980d6917b9a2",
  measurementId: "G-68ZTTX155B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const DashBoard3D = ({ city }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(12); // Initialize zoom level
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null); // For historical data
  const [sensorData, setSensorData] = useState(null); // State for Firebase data

  // Fetch data based on the selected city
  useEffect(() => {
    if (city) {
      if (city.name.toUpperCase() === "VVCE") {
        // Set map center to VVCE Mysuru coordinates
        setMapCenter({ lat: 12.3366, lng: 76.6185 });
        setZoom(14); // Adjust zoom level for VVCE
        setLoading(false);

        // Fetch data from Firebase
        const sensorDataRef = ref(database, "ESP32"); // Replace "sensorData" with your database path
        onValue(sensorDataRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            console.log("Fetched Firebase Data:", data); // Debugging: Log fetched data
            setSensorData(data);
            setWeatherData(null); // Clear Weather API data
          }
        });
      } else {
        // Fetch data from Weather API
        setMapCenter({ lat: city.latitude, lng: city.longitude });
        setZoom(14); // Adjust zoom dynamically
        setLoading(false);

        const fetchWeatherData = async () => {
          const apiKey = "f9fa262185bf4720918192858251502"; // Your WeatherAPI key
          const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city.latitude},${city.longitude}&aqi=yes`;

          try {
            const { data } = await axios.get(url);
            console.log("WeatherAPI Data:", data); // Debugging: Log fetched data
            setWeatherData(data);
            setSensorData(null); // Clear Firebase data

            // Simulate historical data for the last 6 hours
            const simulatedHistoricalData = simulateHistoricalData(data.current);
            setHistoricalData(simulatedHistoricalData);
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        };

        fetchWeatherData();
      }
    }
  }, [city]);

  // Simulate historical data for the last 6 hours
  const simulateHistoricalData = (currentData) => {
    const now = new Date();
    const historicalData = [];

    for (let i = 6; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000); // Subtract i hours
      historicalData.push({
        time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        temperature: currentData.temp_c + (Math.random() - 0.5) * 2, // Random variation
        humidity: currentData.humidity + (Math.random() - 0.5) * 5, // Random variation
        precipitation: currentData.precip_mm + (Math.random() - 0.5) * 0.5, // Random variation
      });
    }

    return historicalData;
  };

  // Prepare data for the graph
  const graphData = {
    labels: historicalData ? historicalData.map((data) => data.time) : [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: historicalData ? historicalData.map((data) => data.temperature) : [],
        borderColor: "#FF6384",
        fill: false,
      },
      {
        label: "Humidity (%)",
        data: historicalData ? historicalData.map((data) => data.humidity) : [],
        borderColor: "#36A2EB",
        fill: false,
      },
      {
        label: "Precipitation (mm)",
        data: historicalData ? historicalData.map((data) => data.precipitation) : [],
        borderColor: "#4BC0C0",
        fill: false,
      },
    ],
  };

  return (
    <APIProvider googleMapsApiKey="AIzaSyCqiZJ3yspNStx5j1DW6OYbAjkP-kPhmYM">
      <div className="dashboard-container">
        <div className="header">
          <h1 className="logo">SMARTSYNC</h1>
          <p className="tagline">A Smarter View for Smarter Cities</p>
        </div>

        <div className="content-container">
          <div className="map-container">
            {loading ? (
              <div className="loading-message">Loading map...</div>
            ) : (
              <Map
                key={`${mapCenter.lat}-${mapCenter.lng}`} // Force re-render
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={mapCenter}
                zoom={zoom}
                gestureHandling="greedy" // Enable zoom and pan gestures
                zoomControl={true} // Enable zoom controls
                disableDefaultUI={false} // Show default UI controls
              >
                <Marker position={mapCenter} />
              </Map>
            )}
          </div>

          <div className="data-container">
            <h2>PARAMETERS</h2>

            {/* Display Firebase data if the city is "VVCE" */}
            {city && city.name.toUpperCase() === "VVCE" && sensorData && (
              <>
                {/* Parameter Boxes for VVCE */}
                <div className="stats-container">
                  <div className="stat-box temperature">
                    <FaThermometerHalf />
                    <h3>Temperature</h3>
                    <p>{sensorData.Temperature} °C</p>
                  </div>
                  <div className="stat-box humidity">
                    <FaTint />
                    <h3>Humidity</h3>
                    <p>{sensorData.Humidity} %</p>
                  </div>
                  <div className="stat-box air-quality">
                    <FaLungs />
                    <h3>Air Quality</h3>
                    <p>{sensorData.AirQuality} AQI</p>
                  </div>
                  <div className="stat-box waste-level">
                    <FaSeedling />
                    <h3>Waste Level</h3>
                    <p>{(sensorData.WasteLevel/28).toFixed(2)} %</p>
                  </div>
                  <div className="stat-box soil-moisture">
                    <FaSeedling />
                    <h3>Soil Moisture</h3>
                    <p>{sensorData.SoilMoisture} %</p>
                  </div>
                  <div className="stat-box ph">
                    <FaSeedling />
                    <h3>pH</h3>
                    <p>{sensorData.pH}</p>
                  </div>
                </div>
              </>
            )}

            {/* Display Weather API data for any other city */}
            {city && city.name.toUpperCase() !== "VVCE" && weatherData && (
              <>
                {/* Graph Section */}
                <div className="chart-box">
                  <div className="chart-container">
                    <Line
                      data={graphData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                {/* Parameter Boxes */}
                <div className="stats-container">
                  <div className="stat-box temperature">
                    <FaThermometerHalf />
                    <h3>Temperature</h3>
                    <p>{weatherData.current.temp_c}°C</p>
                  </div>
                  <div className="stat-box air-quality">
                    <FaLungs />
                    <h3>Air Quality (PM2.5)</h3>
                    <p>{weatherData.current.air_quality?.pm2_5 || "N/A"}</p>
                  </div>
                  <div className="stat-box humidity">
                    <FaTint />
                    <h3>Humidity</h3>
                    <p>{weatherData.current.humidity}%</p>
                  </div>
                  <div className="stat-box rain-accumulation">
                    <FaSeedling />
                    <h3>Precipitation</h3>
                    <p>{weatherData.current.precip_mm} mm</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </APIProvider>
  );
};

export default DashBoard3D;