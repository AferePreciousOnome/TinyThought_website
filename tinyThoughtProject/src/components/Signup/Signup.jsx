import React, { useState } from "react";
import styles from "./Signup.module.css";

function SignupForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Signup successful!");
        onSuccess();
      } else {
        setMessage(data.error || "Signup failed");
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>TinyThought</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.inputField}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.inputField}
      />
      <button type="submit" className={styles.primaryButton}>
        Sign Up
      </button>
      {message && <p className={styles.errorMessage}>{message}</p>}
    </form>
  );
}

export default SignupForm;
