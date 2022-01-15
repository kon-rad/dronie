import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const geofire = require("geofire-common");

// Initialize Cloud Firestore through Firebase
//   // Initialize Firebase
// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//     measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
//   };

// const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const firebaseApp = {};
const db = getFirestore();
export { db, geofire, firebaseApp }
