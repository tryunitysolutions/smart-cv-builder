// src/components/Navbar.jsx

import React, { useEffect, useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Home as HomeIcon,
  Description as CVIcon,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import gsap from "gsap";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const { mode, toggleTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(".navbar", { y: -50, opacity: 0, duration: 0.8, ease: "power3.out" });
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = async () => {
    await signOut(auth);
    setAnchorEl(null);
    navigate("/login");
  };

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const renderLinks = (
    <>
      <Button color="inherit" startIcon={<HomeIcon />} component={NavLink} to="/">
        Home
      </Button>
      {user && (
        <Button color="inherit" startIcon={<CVIcon />} component={NavLink} to="/cvs">
          CVs
        </Button>
      )}
      {!user ? (
        <>
          <Button color="inherit" startIcon={<LoginIcon />} component={NavLink} to="/login">
            Login
          </Button>
          <Button color="inherit" startIcon={<RegisterIcon />} component={NavLink} to="/register">
            Register
          </Button>
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
    <>
      <AppBar position="static" className="navbar" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component={NavLink} to="/" sx={{ textDecoration: "none", color: "inherit" }}>
            Smart CV Builder
          </Typography>

          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
                <Box sx={{ width: 250, padding: 2 }}>
                  <Typography variant="h6" gutterBottom>Menu</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <List onClick={toggleDrawer}>
                    <ListItem button component={NavLink} to="/">
                      <HomeIcon fontSize="small" />&nbsp;<ListItemText primary="Home" />
                    </ListItem>
                    {user && (
                      <ListItem button component={NavLink} to="/cvs">
                        <CVIcon fontSize="small" />&nbsp;<ListItemText primary="CVs" />
                      </ListItem>
                    )}
                    {!user && (
                      <>
                        <ListItem button component={NavLink} to="/login">
                          <LoginIcon fontSize="small" />&nbsp;<ListItemText primary="Login" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/register">
                          <RegisterIcon fontSize="small" />&nbsp;<ListItemText primary="Register" />
                        </ListItem>
                      </>
                    )}
                    {user && (
                      <>
                        <ListItem button component={NavLink} to="/profile">
                          <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem button onClick={handleLogout}>
                          <ListItemText primary="Logout" />
                        </ListItem>
                      </>
                    )}
                    <ListItem button onClick={toggleTheme}>
                      {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                      &nbsp;<ListItemText primary="Toggle Theme" />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {renderLinks}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
