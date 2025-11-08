import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDe2MNap-2T0_XQN1mo05OkjD57g82g7MQ",
  authDomain: "medicare-a16c4.firebaseapp.com",
  projectId: "medicare-a16c4",
  storageBucket: "medicare-a16c4.firebasestorage.app",
  messagingSenderId: "241072365517",
  appId: "1:241072365517:web:61d020ef15d48185b02e84",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);