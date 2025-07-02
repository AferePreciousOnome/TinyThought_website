import React, { useState, useEffect } from "react";
import JournalEntryForm from "../../components/JournalEntry/JournalEntryForm";
import { FaSmile, FaMeh, FaFrown, FaQuestion } from "react-icons/fa";
import MoodTracker from "../../components/MoodTracker/MoodTracker";
import styles from "./JournalPage.module.css";

function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [randomQuote, setRandomQuote] = useState("");

  useEffect(() => {
    const ENCOURAGING_QUOTES = [
      "You're doing amazing. Keep going! 🌈",
      "Take a deep breath. You’re enough. 💛",
      "Small steps every day lead to big change. 🌱",
      "Feel your feelings — they matter. 💌",
      "You’re not alone. You are loved. ❤️",
    ];
    const random =
      ENCOURAGING_QUOTES[Math.floor(Math.random() * ENCOURAGING_QUOTES.length)];
    setRandomQuote(random);
  }, []);

  const fetchEntries = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:5000/journal", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setEntries(res.ok ? data : []);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const sentimentIcons = {
    positive: <FaSmile />,
    neutral: <FaMeh />,
    negative: <FaFrown />,
    unknown: <FaQuestion />,
  };

  const sentimentCounts = entries.reduce((acc, entry) => {
    const label = entry.sentiment_label?.toLowerCase() || "unknown";
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className={styles.page}>
      <div className={styles.encouragementBanner}>
        <p>{randomQuote}</p>
      </div>
      <JournalEntryForm onEntryAdded={fetchEntries} />
      <MoodTracker entries={entries} />

      <div className={styles.summaryContainer}>
        <h2>Recent Mood Summary</h2>
        <div className={styles.emojiSummary}>
          {Object.entries(sentimentCounts).map(([label, count]) => (
            <div
              key={label}
              className={`${styles.sentimentBadge} ${styles[label]}`}
              title={`${label} (${count})`}
            >
              <span className={styles.emoji}>{sentimentIcons[label]}</span>
              <span className={styles.count}>{count}</span>
              <span className={styles.labelText}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JournalPage;
