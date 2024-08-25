// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXXNA-1zK1-D3YdUxgdE0incnwF0Vy_uA",
  authDomain: "busy-buy-c8b1c.firebaseapp.com",
  databaseURL: "https://busy-buy-c8b1c-default-rtdb.firebaseio.com",
  projectId: "busy-buy-c8b1c",
  storageBucket: "busy-buy-c8b1c.appspot.com",
  messagingSenderId: "29755796398",
  appId: "1:29755796398:web:2cee7f971f5e11c6ac363f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
const db = getFirestore(app);

// Authentication
const auth = getAuth(app)

export {app, auth, db};