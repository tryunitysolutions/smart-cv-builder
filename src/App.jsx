import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cvs from "./pages/Cvs";
import Profile from "./pages/Profile";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <div style={{ paddingTop: hideNavbarRoutes.includes(location.pathname) ? 0 : "64px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cvs" element={<Cvs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
