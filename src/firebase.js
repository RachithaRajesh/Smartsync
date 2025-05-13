// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database"; // Import ref here


// Your Firebase configuration
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
const database = getDatabase(app);

// Export database and ref
export { database, ref };