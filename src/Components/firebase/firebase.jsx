import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrdCrqUV5MWwdRWmkFRqcvuj1MN76l2qE",
  authDomain: "media-8998c.firebaseapp.com",
  projectId: "media-8998c",
  storageBucket: "media-8998c.appspot.com",
  messagingSenderId: "91482997431",
  appId: "1:91482997431:web:77598b5772423823d64332",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, onAuthStateChanged, app, provider };
