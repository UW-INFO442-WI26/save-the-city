// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUtXlv_JQgrxcrNFCYLK2FYSFyqb7ANc4",
  authDomain: "save-the-city-906f2.firebaseapp.com",
  databseURL: "https://save-the-city-906f2-default-rtdb.firebaseio.com/",
  projectId: "save-the-city-906f2",
  storageBucket: "save-the-city-906f2.firebasestorage.app",
  messagingSenderId: "754921736073",
  appId: "1:754921736073:web:842d06494ac8305a850358"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);