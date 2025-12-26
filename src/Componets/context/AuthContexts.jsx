import React, { useEffect, useState } from "react";
import { Provider } from "./Provider";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../utils/Firebase.init";

const googleprovider = new GoogleAuthProvider();

const AuthContexts = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // Reg with email and password
  const createuserwithemailandpassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //sign with email and password
  const signinuserwithemailandpassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign with google
  const signinwithgoogle = () => {
    return signInWithPopup(auth, googleprovider);
  };

  // UserObserver
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authinfo = {
    user,
    loading,
    createuserwithemailandpassword,
    signinuserwithemailandpassword,
    signinwithgoogle,
  };
  return <Provider value={authinfo}>{children}</Provider>;
};

export default AuthContexts;
