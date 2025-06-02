import React, { useState, useEffect, useContext } from "react";
import {
  AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem,
  Drawer, List, ListItem, ListItemText, Avatar, useMediaQuery, Box
} from "@mui/material";
import {
  Home as HomeIcon, Login as LoginIcon, PersonAdd, Description, Menu as MenuIcon,
  Brightness4, Brightness7
} from "@mui/icons-material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import gsap from "gsap";

const Navbar = ({ setSnackbar }) => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");

  const hiddenRoutes = ["/login", "/register", "/forgot-password"];
  const showNavbar = !hiddenRoutes.includes(location.pathname);

  useEffect(() => {
    gsap.from(".navbar", { y: -60, opacity: 0, duration: 0.8, ease: "power3.out" });
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    await signOut(auth);
    setAnchorEl(null);
    setSnackbar({ open: true, message: "Logged out!" });
    navigate("/login");
  };

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  if (!showNavbar) return null;

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#2563EB" : "inherit",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal"
  });

  const renderLinks = (
    <>
      <Button component={NavLink} to="/" sx={navLinkStyle} startIcon={<HomeIcon />}>Home</Button>
      {user && <Button component={NavLink} to="/cvs" sx={navLinkStyle} startIcon={<Description />}>CVs</Button>}
      {!user ? (
        <>
          <Button component={NavLink} to="/login" sx={navLinkStyle} startIcon={<LoginIcon />}>Login</Button>
          <Button component={NavLink} to="/register" sx={navLinkStyle} startIcon={<PersonAdd />}>Register</Button>
        </>
      ) : (
        <>
          <IconButton onClick={handleAvatarClick} color="inherit">
            <Avatar>{user.email[0].toUpperCase()}</Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => { handleMenuClose(); navigate("/profile"); }}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      )}
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </>
  );

  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={NavLink}
          to="/"
          sx={{ textDecoration: "none", color: "inherit", fontWeight: 600 }}
        >
          Smart CV Builder
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={toggleDrawer}><MenuIcon /></IconButton>
            <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
              <Box sx={{ width: 250, padding: 2 }}>
                <List>
                  <ListItem button component={NavLink} to="/" onClick={toggleDrawer}><HomeIcon /><ListItemText primary="Home" /></ListItem>
                  {user && <ListItem button component={NavLink} to="/cvs" onClick={toggleDrawer}><Description /><ListItemText primary="CVs" /></ListItem>}
                  {!user ? (
                    <>
                      <ListItem button component={NavLink} to="/login" onClick={toggleDrawer}><LoginIcon /><ListItemText primary="Login" /></ListItem>
                      <ListItem button component={NavLink} to="/register" onClick={toggleDrawer}><PersonAdd /><ListItemText primary="Register" /></ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem button component={NavLink} to="/profile" onClick={toggleDrawer}><ListItemText primary="Profile" /></ListItem>
                      <ListItem button onClick={handleLogout}><ListItemText primary="Logout" /></ListItem>
                    </>
                  )}
                  <ListItem button onClick={toggleTheme}>
                    {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                    <ListItemText primary="Toggle Theme" />
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>{renderLinks}</Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;