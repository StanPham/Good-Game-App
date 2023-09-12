// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuEyCu2MaTN19twMKEB-dfnXiRUy_8y8U",
  authDomain: "good-game-web-app.firebaseapp.com",
  projectId: "good-game-web-app",
  storageBucket: "good-game-web-app.appspot.com",
  messagingSenderId: "699507515979",
  appId: "1:699507515979:web:2902c247a989e5902e63ce",
  measurementId: "G-C4SG4GD9CM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);