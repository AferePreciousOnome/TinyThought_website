import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { loginSchema } from "../../utils/validations";

export default function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await loginSchema.validate({ email, password });
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
        onSuccess();
      } else {
        setMessage(data.error || "Login failed");
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
        className={styles["input-field"]}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles["input-field"]}
      />
      <button type="submit" className={styles["primary-button"]}>
        Login
      </button>
      <p className={styles["forgot-password-text"]}>
        <Link to="/forgot-password" className={styles["forgot-password-link"]}>
          Forgot Password?
        </Link>
      </p>
      {message && <p className={styles["error-message"]}>{message}</p>}
    </form>
  );
}
