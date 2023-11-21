
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzw5KWPFmLVUTlgcLPytBep9vX1EUfCGI",
  authDomain: "productosnaturales-81b16.firebaseapp.com",
  projectId: "productosnaturales-81b16",
  storageBucket: "productosnaturales-81b16.appspot.com",
  messagingSenderId: "373691842095",
  appId: "1:373691842095:web:ce91b69e44523a789ed0da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const firestoneInit=()=>app;
