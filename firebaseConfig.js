// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlzrLp_Bmgg0-_jXYz0Dy2RrhLnya0_rA",
  authDomain: "file-storage-and-share.firebaseapp.com",
  projectId: "file-storage-and-share",
  storageBucket: "file-storage-and-share.appspot.com",
  messagingSenderId: "409966978241",
  appId: "1:409966978241:web:673cffd8efbbf9ef3fa040",
  measurementId: "G-FGTR37EDGC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);