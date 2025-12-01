import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBB9Jr7YOVwtFhDfS7v-xFzbZqT-PrOQyE",
  authDomain: "chatbot-app-34119.firebaseapp.com",
  projectId: "chatbot-app-34119",
  storageBucket: "chatbot-app-34119.firebasestorage.app",
  messagingSenderId: "73041097740",
  appId: "1:73041097740:web:f3988e26a2daae17cc2a29",
  measurementId: "G-QC3TYKRHRN"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);