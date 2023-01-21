import { NavLink } from "react-router-dom"

import Login from "../pages/Login"


export default function Navigation() {
  return (
    <>
      <div>
        <NavLink to="login">Login</NavLink>
      </div>
    </>
  )
}