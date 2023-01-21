import { NavLink } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";


export default function Navigation() {
  return (
    <>
      <br/>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <NavLink to="login">Login</NavLink>
        <NavLink to="watchlist">Watchlist</NavLink>
        <NavLink to="home">Home</NavLink>
      </div>
      <br/>
    </>
  )
}