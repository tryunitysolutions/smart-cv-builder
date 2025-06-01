import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaHome,
  FaFileAlt,
  FaSignInAlt,
  FaUserPlus,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import gsap from "gsap";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { dark, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navRef = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // Animate navbar on mount
  useEffect(() => {
    gsap.from(navRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-2 py-1 rounded-md transition-all ${
      isActive
        ? "text-primary font-semibold underline underline-offset-4"
        : "text-lightText dark:text-darkText hover:text-primary dark:hover:text-primary"
    }`;

  return (
    <nav
      ref={navRef}
      className="bg-lightBg dark:bg-darkBg shadow-md fixed top-0 left-0 w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-heading text-primary dark:text-primary"
        >
          Smart CV Builder
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClasses}>
            <FaHome /> Home
          </NavLink>

          {user && (
            <NavLink to="/cvs" className={navLinkClasses}>
              <FaFileAlt /> CVs
            </NavLink>
          )}

          {!user ? (
            <>
              <NavLink to="/login" className={navLinkClasses}>
                <FaSignInAlt /> Login
              </NavLink>
              <NavLink to="/register" className={navLinkClasses}>
                <FaUserPlus /> Register
              </NavLink>
            </>
          ) : (
            <div className="relative group">
              <button className="flex items-center gap-2 font-medium text-lightText dark:text-darkText hover:text-primary dark:hover:text-primary">
                <FaUserCircle />
                {user.email.split("@")[0]}
              </button>
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-md hidden group-hover:block">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          <button
            onClick={toggleTheme}
            className="text-lg text-gray-600 dark:text-gray-300 hover:text-primary"
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-2xl text-gray-700 dark:text-gray-300"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-lightBg dark:bg-darkBg px-4 py-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
          <NavLink to="/" onClick={toggleMenu} className={navLinkClasses}>
            <FaHome /> Home
          </NavLink>

          {user && (
            <NavLink to="/cvs" onClick={toggleMenu} className={navLinkClasses}>
              <FaFileAlt /> CVs
            </NavLink>
          )}

          {!user ? (
            <>
              <NavLink to="/login" onClick={toggleMenu} className={navLinkClasses}>
                <FaSignInAlt /> Login
              </NavLink>
              <NavLink to="/register" onClick={toggleMenu} className={navLinkClasses}>
                <FaUserPlus /> Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile" onClick={toggleMenu} className={navLinkClasses}>
                <FaUserCircle /> Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-lightText dark:text-darkText hover:text-primary dark:hover:text-primary"
              >
                Logout
              </button>
            </>
          )}

          <button onClick={toggleTheme} className={navLinkClasses}>
            {dark ? <FaSun /> : <FaMoon />} Theme
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
