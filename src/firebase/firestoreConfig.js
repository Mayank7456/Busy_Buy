// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAEq_gSUMASQqa5eqXF6pUjSDSNRZ4r7I",
  authDomain: "busy-buy-97080.firebaseapp.com",
  projectId: "busy-buy-97080",
  storageBucket: "busy-buy-97080.firebasestorage.app",
  messagingSenderId: "307057779295",
  appId: "1:307057779295:web:52f719c797c6a7d25631ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
const db = getFirestore(app);

// Authentication
const auth = getAuth(app)

export {app, auth, db};