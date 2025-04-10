import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here...
    alert("Login Successful!");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Enter Email" required />
        <input type="password" placeholder="Enter Password" required />
        <button type="submit" className="login-btn">Login</button>
      </form>
      <p>Dont have an account?</p>
      <button onClick={() => navigate("/signup")} className="signup-btn">
        Sign Up
      </button>
    </div>
  );
};

export default Login;
