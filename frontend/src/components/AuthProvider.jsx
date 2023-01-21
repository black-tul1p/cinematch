import { useState } from "react"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


import { AuthContext } from "./AuthContext"


export default function AuthProvider({ children }) {

  const [user, setUser] = useState();
  const [error, setError] = useState();

  const provider = new GoogleAuthProvider();
  const auth = getAuth();


  const loginUser = () => {

    alert('login triggered')

    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    
    // set user
    setUser(user);

  }).catch((error) => {
    console.error(error)
    setError(error)
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
  }

  const value = {
    user: user,
    error: error,
    login: loginUser,
  }
  
  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}