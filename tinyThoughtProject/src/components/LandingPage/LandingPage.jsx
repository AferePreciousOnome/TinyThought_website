import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../Login/Login.jsx";
import SignupForm from "../Signup/Signup.jsx";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleSuccess = () => {
    navigate("/journal");
  };

  return (
    <div className={styles["landing-page"]}>
      <div className={`${styles.card} ${styles["animate-fade-in"]}`}>
        <h2 className={styles["card-title"]}>
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {isLogin ? (
          <LoginForm onSuccess={handleSuccess} />
        ) : (
          <SignupForm onSuccess={handleSuccess} />
        )}
        <p className={styles["toggle-text"]}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            className={styles["toggle-button"]}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
