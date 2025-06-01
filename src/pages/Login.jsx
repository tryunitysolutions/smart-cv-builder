import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user:", userCredential.user);
      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-64 mx-auto mt-10">
      <h2 className="text-xl font-bold text-center">Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 rounded"
        required
      />
      <button type="submit" className="bg-green-500 text-white rounded py-2">Login</button>
    </form>
  );
};

export default Login;
