// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "your_firebase_api_key",
  authDomain: "your_firebase_authDomain",
  projectId: "your_firebase_projectId",
  storageBucket: "your_firebase_storageBucket",
  messagingSenderId: "your_firebase_messagingSenderId",
  appId: "your_firebase_appId",
  measurementId: "your_firebase_measurementId"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
