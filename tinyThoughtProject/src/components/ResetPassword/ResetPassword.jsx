import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ResetPassword.module.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Password reset successful!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(data.error || "Failed to reset password.");
      }
    } catch (err) {
      setError("Server error, please try again later.", err);
    }
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.heading}>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_fields}>
          <input
            className={styles["input-field"]}
            type="password"
            placeholder="New Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className={styles["input-field"]}
            type="password"
            placeholder="Confirm New Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles["primary-button"]}>
          Reset Password
        </button>
      </form>
      {message && <p className={styles["success-message"]}>{message}</p>}
      {error && <p className={styles["error-message"]}>{error}</p>}
    </div>
  );
}

export default ResetPassword;
