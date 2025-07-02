import React from "react";
import styles from "./Footer.module.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Created with 💜 by Precious Afere</p>
      <div className={styles.socials}>
        <a
          href="https://github.com/AferePreciousOnome"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/afere-precious-3929a0306/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
