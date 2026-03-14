import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxtkewIZ8dt0MF9PslTvAPw8GWkhxL0c",
  authDomain: "love-calculator-a7673.firebaseapp.com",
  projectId: "love-calculator-a7673",
  storageBucket: "love-calculator-a7673.firebasestorage.app",
  messagingSenderId: "102792595927",
  appId: "1:102792595927:web:fc86745b3d51053aff0952"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
