import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflix-clone-7864d.firebaseapp.com",
  projectId: "netflix-clone-7864d",
  storageBucket: "netflix-clone-7864d.appspot.com",
  messagingSenderId: "730657715052",
  appId: "1:730657715052:web:092b26987ac6aa6bc57949",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default auth;
export { db };
