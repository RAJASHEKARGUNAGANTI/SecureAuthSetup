import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import Cookies from "js-cookie";


const Navbar = () => {
  const { userData, setUserData, logout, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a request to clear the refresh token on the server
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });

      // Clear client-side auth data
      setAuth(false);    // Reset auth state
      setUserData(null); // Clear user data
      Cookies.remove('token');
      logout();

      // Navigate back to home after logout
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-secondary text-primary border border-b-2 shadow-lg px-32 p-4 pt-8 flex justify-between items-center font-merriweather">
      {/* Logo */}
      <div className="flex items-center space-x-4 pr-6 font-extrabold">
        <Link to="/">
        <p>LOGO</p>
        </Link>
       
      </div>

      {/* Links */}
      <ul className="flex items-center space-x-8 text-darkGreen font-medium">
        <li>
          <Link to="/" className="hover:text-lightGreen transition-colors">Home</Link>
        </li>
        <li>
          <Link to="/course" className="hover:text-lightGreen transition-colors">Courses</Link>
        </li>
        <li>
          <Link to="/Project" className="hover:text-lightGreen transition-colors">Project</Link>
        </li>
      </ul>
      <div className="flex items-center space-x-6">
        {/* Auth Links */}
        {userData ? (
          <>
            <Link to="/profile" className="text-darkGreen hover:text-lightGreen transition-colors">Profile</Link>
            <button onClick={handleLogout} className="bg-primary text-white px-4 py-2 rounded-full hover:bg-third transition-colors">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-lightGreen text-white px-4 p-2 rounded-full transition-colors bg-primary">Log In</Link>
            <Link to="/login" className="bg-darkGreen text-primary px-4 py-2 rounded-full hover:bg-third transition-colors border border-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
