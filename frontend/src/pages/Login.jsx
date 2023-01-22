import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import GoogleButton from "../assets/google_login.png";

export default function Login() {
  const { user, login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="Login-page">
      {user ? (
        <Navigate to="/home" replace={true} />
      ) : (
        <button onClick={handleLogin} className="Login-button" role="button">
          <img src={GoogleButton} width="250em" />
        </button>
      )}
    </div>
  );
}
