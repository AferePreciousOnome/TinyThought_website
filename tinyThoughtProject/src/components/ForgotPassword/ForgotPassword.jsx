import React, { useState } from "react";
import styles from "./ForgotPassword.module.css"; // adjust path if needed

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await fetch("http://localhost:5000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Check your email for reset instructions.");
      } else {
        setError(data.error || "Failed to send reset email.");
      }
    } catch (err) {
      setError("Server error, please try again later.", err);
    }
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.heading}>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          className={styles["input-field"]}
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className={styles["primary-button"]}>
          Send Reset Link
        </button>
      </form>
      {message && <p className={styles["success-message"]}>{message}</p>}
      {error && <p className={styles["error-message"]}>{error}</p>}
    </div>
  );
}

export default ForgotPassword;
