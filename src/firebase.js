import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getFunctions } from 'firebase/functions'


// const firebaseConfig = {
//   apiKey: "AIzaSyDuEyCu2MaTN19twMKEB-dfnXiRUy_8y8U",
//   authDomain: "good-game-web-app.firebaseapp.com",
//   projectId: "good-game-web-app",
//   storageBucket: "good-game-web-app.appspot.com",
//   messagingSenderId: "699507515979",
//   appId: "1:699507515979:web:2902c247a989e5902e63ce",
//   measurementId: "G-C4SG4GD9CM"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDD0GnAEnDepMZDtBnmpLYfsg2r4ylSgCI",
  authDomain: "good-game-dev-environment.firebaseapp.com",
  projectId: "good-game-dev-environment",
  storageBucket: "good-game-dev-environment.appspot.com",
  messagingSenderId: "859762729009",
  appId: "1:859762729009:web:8df37547ed497863c0b510",
  measurementId: "G-ZS9DMP8HLQ"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);

export const firebaseAppAuth = getAuth(firebaseApp);

export const firebaseFunctions = getFunctions(firebaseApp);