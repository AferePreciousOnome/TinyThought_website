import React, { useState } from "react";
import styles from "./JournalEntryForm.module.css";
import { Link } from "react-router-dom";
import { journalSchema } from "../../utils/validations";

function JournalEntryForm({ onEntryAdded }) {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await journalSchema.validate({ content });
    } catch (validationError) {
      setMessage(validationError.message);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please log in to add a journal entry.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();
      if (response.ok) {
        setContent("");
        setMessage("Entry added!");
        if (onEntryAdded) onEntryAdded();
      } else {
        setMessage(data.error || "Failed to submit.");
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.heading}>
        <h2 className={styles.header}>TinyThought</h2>
        <Link to="/profile" className={styles.profileLink}>
          View All Entries &rarr;
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          rows="4"
          placeholder="Write about your day..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className={styles.button}
          type="submit"
          disabled={!content.trim() || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Analyze"}
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export default JournalEntryForm;
