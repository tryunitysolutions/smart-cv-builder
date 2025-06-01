import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Make sure path is correct

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registered user:", userCredential.user);
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error.message);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4 w-64 mx-auto mt-10">
      <h2 className="text-xl font-bold text-center">Register</h2>
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
      <button type="submit" className="bg-blue-500 text-white rounded py-2">Register</button>
    </form>
  );
};

export default Register;
