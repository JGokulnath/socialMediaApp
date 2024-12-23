import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDv0e6MeBQlix4OzAyS50ZaICvrNtl39UE",
  authDomain: "socialmedia-7890e.firebaseapp.com",
  projectId: "socialmedia-7890e",
  storageBucket: "socialmedia-7890e.firebasestorage.app",
  messagingSenderId: "786115539689",
  appId: "1:786115539689:web:c44a7176f6e426914bb678",
  measurementId: "G-FZY2LWE81X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);