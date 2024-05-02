import React, { createContext, useEffect, useState } from "react";

import auth from "../../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  // creating user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // track the user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current user in auth Provider", currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe;
    };
  }, []);

  // log out user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // google sign in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  // console.log(loading);
  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signInUser,
    logOut,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
