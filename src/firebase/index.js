// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_iKKzh-zNe306BUODYNdZqShv7e2vieQ",
  authDomain: "crud-firebase-3f9be.firebaseapp.com",
  projectId: "crud-firebase-3f9be",
  storageBucket: "crud-firebase-3f9be.appspot.com",
  messagingSenderId: "809143012256",
  appId: "1:809143012256:web:8b10602972737f7b2172c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{
    db
}