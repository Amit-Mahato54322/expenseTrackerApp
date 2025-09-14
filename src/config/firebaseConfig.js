import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9i3F7YaRtK-751AVJf2jHluKNl8pQXF8",
  authDomain: "expense-tracker-e3923.firebaseapp.com",
  projectId: "expense-tracker-e3923",
  storageBucket: "expense-tracker-e3923.appspot.com",
  messagingSenderId: "738168370888",
  appId: "1:738168370888:web:98bd3a43b2679ed71d57fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default firebaseConfig;
