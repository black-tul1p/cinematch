import { useContext } from "react";

import { AuthContext } from "../components/AuthContext";

export default function Login() {

  const { login } = useContext(AuthContext)

  return (
    <>
      <button onClick={login}>Login Here</button>
    </>
  )

}