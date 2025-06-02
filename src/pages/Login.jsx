import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(".login-form", { opacity: 0, y: 40, duration: 0.6, ease: "power2.out" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
      <Paper elevation={4} sx={{ padding: 4, maxWidth: 400 }} className="login-form">
        <Typography variant="h5" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth margin="normal" type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Login</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
