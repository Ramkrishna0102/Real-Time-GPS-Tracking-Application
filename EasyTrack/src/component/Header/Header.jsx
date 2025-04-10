import { FaBars } from "react-icons/fa";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "./Header.css";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <header className="header">
      <div className="menu-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <h1 className="website-name">Easy-Track</h1>
      <div className="auth-buttons">
        <button className="login-btn" onClick={() => navigate("/signup")}>
          Login
        </button>
        {/* <button className="signup-btn" onClick={() => navigate("/signup")}>
          Sign Up
        </button> */}
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
