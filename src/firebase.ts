import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
 



const firebaseConfig = {
  apiKey: "AIzaSyAy0OqWLgoarJXHBEXrX9qx-lk7Qw0mfRI",
  authDomain: "chat-app-21bb0.firebaseapp.com",
  projectId: "chat-app-21bb0",
  storageBucket: "chat-app-21bb0.appspot.com",
  messagingSenderId: "125667724726",
  appId: "1:125667724726:web:a5df9b29f98c8ded004517",
  measurementId: "G-TSC1E9CVL7"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const db = getFirestore(app)
