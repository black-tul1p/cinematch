import { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { AuthContext } from "./AuthContext";
import { FireStoreDB } from "../main";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const loginUser = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        // set user
        setUser(user);

        // create a user in the database if doesnt exist
        // if exists, it overwrites

        const docRef = await setDoc(doc(FireStoreDB, "users", user.uid), {
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          email: user.email,
        });
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const logoutUser = () => {
    setUser(null);
  }

  const value = {
    user: user,
    error: error,
    login: loginUser,
    logout: logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
