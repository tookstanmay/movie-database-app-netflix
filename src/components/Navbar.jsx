import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
        <picture>
          <source
            media="(min-width: 640px)"
            srcSet="../../images/netflix_logo.png"
          />
          <img
            src="../../images/netflix_symbol.png"
            alt="netflix"
            style={{ height: "60px" }}
          />
        </picture>
      </Link>
      <div className="text-sm">
        {user ? (
          <div>
            <Link to="/account">
              <button className="text-white mr-4">Account</button>
            </Link>
            <button
              className="bg-red-600 text-white px-6 py-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button className="text-white mr-4">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="bg-red-600 text-white px-6 py-2 rounded">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
