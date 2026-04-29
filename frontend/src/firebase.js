import React from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyB0bGN37eKhaYgr3yOYTBkeMrIYjizSDKM",
  authDomain: "login1-9143b.firebaseapp.com",
  projectId: "login1-9143b",
  storageBucket: "login1-9143b.firebasestorage.app",
  messagingSenderId: "884812413022",
  appId: "1:884812413022:web:945d60c06c34c64a09dccf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };