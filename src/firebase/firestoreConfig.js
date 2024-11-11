// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDo8Og_JjNjz363-BL48DEfLxMlPYuggDM",
  authDomain: "busy-buy-d235f.firebaseapp.com",
  projectId: "busy-buy-d235f",
  storageBucket: "busy-buy-d235f.firebasestorage.app",
  messagingSenderId: "330759277555",
  appId: "1:330759277555:web:e1349d3eba0de1fd922086"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
const db = getFirestore(app);

// Authentication
const auth = getAuth(app)

export {app, auth, db};