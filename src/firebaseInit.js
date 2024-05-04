import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyc6qCBno8XlhVYmMVKsGnKKfJsAbYWPs",
  authDomain: "busy-buy-b9045.firebaseapp.com",
  projectId: "busy-buy-b9045",
  storageBucket: "busy-buy-b9045.appspot.com",
  messagingSenderId: "526461658507",
  appId: "1:526461658507:web:2cf5535a206b33f474bb8e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
