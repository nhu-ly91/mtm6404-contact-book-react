import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA5QGJQiqEauQ_R1u8ezaSaeevQcj_7l1o",
    authDomain: "contact-book-6d4e4.firebaseapp.com",
    projectId: "contact-book-6d4e4",
    storageBucket: "contact-book-6d4e4.firebasestorage.app",
    messagingSenderId: "324803220244",
    appId: "1:324803220244:web:84718fb2c955a11918a801",
    measurementId: "G-3L8YJ0F4Z1"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;