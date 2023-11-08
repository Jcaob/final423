import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import React from "react";
import { createContext, useState, useEffect } from "react";
import { auth, db, onAuthStateChanged } from "../firebase/firebase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AppContext = ({ children }) => {
  const collectionRef = collection(db, "users");
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const popup = await signInWithPopup(auth, provider);
      const user = popup.user;
      const q = query(collectionRef, where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collectionRef, {
          uid: user?.uid,
          name: user?.displayName,
          email: user?.email,
          Image: user?.photoURL,
          authProvider: popup.providerId,
        });
        console.log(user);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const loginWithUserAndEmail = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateCurrentUser = async (displayName, password) => {
    updateProfile(auth.currentUser, {
      displayName: displayName,
    })
      .then(() => {
        // Profile updated!
        console.log("worked");
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.log(error);
      });
    updatePassword(auth.currentUser, password)
      .then(() => {
        // Update successful.4
        console.log(password);
        console.log("password Updated");
      })
      .catch((error) => {
        // An error ocurred
        // ...
        console.log(error);
      });
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collectionRef, {
        uid: user.uid,
        name,
        providerId: "email/password",
        email: user.email,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const sendPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("New Password Sent To Email");
    } catch (err) {
      console.log(err.message);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const userStateChanged = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collectionRef, where("uid", "==", user?.uid));
        await onSnapshot(q, (doc) => {
          setUserData(doc?.docs[0]?.data());
        });
        setUser(user);
      } else {
        setUser(null);
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    userStateChanged();
    if (user || userData) {
      navigate("/");
    } else {
      navigate("/login");
    }
    return () => userStateChanged();
  }, []);

  const initalState = {
    signInWithGoogle: signInWithGoogle,
    loginWithUserAndEmail: loginWithUserAndEmail,
    registerWithEmailAndPassword: registerWithEmailAndPassword,
    sendPassword: sendPassword,
    signOutUser: signOutUser,
    user: user,
    userData: userData,
    updateCurrentUser: updateCurrentUser,
  };

  return (
    <div>
      <AuthContext.Provider value={initalState}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AppContext;
