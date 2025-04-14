import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7ncA3KSeAkSaykiKi0081DkPBLPW1Ipo",
  authDomain: "mtm6404-claist-cb173.firebaseapp.com",
  projectId: "mtm6404-claist-cb173",
  storageBucket: "mtm6404-claist-cb173.firebasestorage.app",
  messagingSenderId: "738963630025",
  appId: "1:738963630025:web:2d30b3ec262db09e45aa18"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;