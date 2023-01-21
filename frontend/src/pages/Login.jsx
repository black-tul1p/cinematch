import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { FirebaseApp } from "../main"


export default function Login() {
  
  const provider = new GoogleAuthProvider();

  const auth = getAuth();

  const signInHelper = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    alert("success")
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    alert("error")
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
  
  return (
    <>
      <button onClick={signInHelper}>Login Here</button>
    </>
  )

}