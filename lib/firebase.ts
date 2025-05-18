import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBmBLACUzAkzeelVqUACtue64KpcJ5BnQ4",
  authDomain: "iot2025-cc640.firebaseapp.com",
  databaseURL: "https://iot2025-cc640-default-rtdb.firebaseio.com",
  projectId: "iot2025-cc640",
  storageBucket: "iot2025-cc640.firebasestorage.app",
  messagingSenderId: "210923485944",
  appId: "1:210923485944:web:2e3b9e6552fc13cd01990d"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
