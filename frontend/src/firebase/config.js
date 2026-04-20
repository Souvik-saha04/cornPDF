// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNZ1doozcqzWAEvdf_yIUC97iLBp7EStY",
  authDomain: "cornpdf.firebaseapp.com",
  projectId: "cornpdf",
  storageBucket: "cornpdf.firebasestorage.app",
  messagingSenderId: "321285752242",
  appId: "1:321285752242:web:5c6f8e1f86c3102c2590ab",
  measurementId: "G-WBYE9YH3HJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
