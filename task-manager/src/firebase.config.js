// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMlAFSdDcj-OSdkFTgUmIw2LZegu2nkDE",
  authDomain: "taskly-34571.firebaseapp.com",
  projectId: "taskly-34571",
  storageBucket: "taskly-34571.firebasestorage.app",
  messagingSenderId: "989970191372",
  appId: "1:989970191372:web:3f54050374299be0760a29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;