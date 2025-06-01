import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Cvs from "./pages/Cvs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  const location = useLocation();
  const hideNavbarOnRoutes = ["/login", "/register"];

  return (
    <>
      {!hideNavbarOnRoutes.includes(location.pathname) && <Navbar />}

      <div className={!hideNavbarOnRoutes.includes(location.pathname) ? "pt-20 px-4" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cvs" element={<Cvs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
