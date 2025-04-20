// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNCFKej11dmr9XH-VWyOHHkSHgDHEDDvw",
  authDomain: "busy-buy-227e4.firebaseapp.com",
  projectId: "busy-buy-227e4",
  storageBucket: "busy-buy-227e4.firebasestorage.app",
  messagingSenderId: "154720619052",
  appId: "1:154720619052:web:4b861d5316c20e49a8df89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
const db = getFirestore(app);

// Authentication
const auth = getAuth(app)

export {app, auth, db};