import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {getStorage} from "firebase/storage";
// import { getAuth } from 'firebase/auth'
// import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: "AIzaSyDoAhH-GgFLV0TcyuP_bv6a1Qg1xGXnzNk",

  authDomain: "wiiiiiiiiiiiiiiiiiiiiiii-67361.firebaseapp.com",

  projectId: "wiiiiiiiiiiiiiiiiiiiiiii-67361",

  storageBucket: "wiiiiiiiiiiiiiiiiiiiiiii-67361.appspot.com",

  messagingSenderId: "1045447905665",

  appId: "1:1045447905665:web:6cdf521d75cba542cb5880",

  measurementId: "G-MLZP7GTNTN"


};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);

export{storage, db};



// export const firebaseAppAuth = getAuth(firebaseApp);

// export const firebaseFunctions = getFunctions(firebaseApp);