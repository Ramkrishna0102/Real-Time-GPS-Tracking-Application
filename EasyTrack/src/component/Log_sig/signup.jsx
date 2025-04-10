import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/register", formData);
      navigate("/login"); // Redirect after successful signup
    } catch (err) {
      console.error("Signup Error:", err);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    try {
      const response = await axios.post("http://localhost:3001/google-login", {
        token: credentialResponse.credential,
      });
      console.log("Server Response:", response.data);
      navigate("/home"); // Redirect after successful login
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const handleGoogleLoginFailure = () => {
    console.error("Google Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId="968806106640-j4mkks1779respci0fj6vf37h6u2pgp6.apps.googleusercontent.com">
      <div className="signup-container">
        <div className="signup-card">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required />
            <button type="submit">Register</button>
          </form>

          <p>Or</p>

          {/* Google Login Button */}
          <div className="google-login">
            <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginFailure} />
          </div>

          <p>Already Have an Account? <span onClick={() => navigate("/login")}>Login</span></p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
