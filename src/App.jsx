import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { Toolbar, Snackbar } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Cvs from "./pages/Cvs";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const location = useLocation();
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  // Hide navbar on auth-related pages
  const hideNavbarRoutes = ["/login", "/register", "/forgot-password"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* ✅ Show Navbar only when allowed */}
      {showNavbar && <Navbar setSnackbar={setSnackbar} />}

      {/* ✅ Always insert space for fixed navbar */}
      <Toolbar sx={{ minHeight: 64 }} />

      {/* ✅ App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setSnackbar={setSnackbar} />} />
        <Route path="/register" element={<Register setSnackbar={setSnackbar} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/cvs"
          element={
            <PrivateRoute>
              <Cvs />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* ✅ Snackbar for global messages */}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "" })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}

export default App;
