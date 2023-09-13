// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "amrauth-fd71c.firebaseapp.com",
  projectId: "amrauth-fd71c",
  storageBucket: "amrauth-fd71c.appspot.com",
  messagingSenderId: "248211036657",
  appId: "1:248211036657:web:da68751c77549aa73f8c50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);