// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAehO2JzmJdxjD1cRKaot3TKrbMTVsxW08",
    authDomain: "ideaweb-c93ab.firebaseapp.com",
    projectId: "ideaweb-c93ab",
    storageBucket: "ideaweb-c93ab.firebasestorage.app",
    messagingSenderId: "576686264255",
    appId: "1:576686264255:web:bbd03996894646f5689b0a"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
