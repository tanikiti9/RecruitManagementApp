// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBANYWlvLNK5Y-6rXyHarwcqdvOlPpkMvs",
  authDomain: "reqruit-management-app.firebaseapp.com",
  projectId: "reqruit-management-app",
  storageBucket: "reqruit-management-app.firebasestorage.app",
  messagingSenderId: "45169549774",
  appId: "1:45169549774:web:2dbd53c0dac0c96fb9cb9f"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app)
// Initialize Firebase