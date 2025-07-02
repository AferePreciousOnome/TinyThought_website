import styles from "./JournalProfile.module.css";
import { FaSmile, FaMeh, FaFrown, FaQuestion } from "react-icons/fa";

function JournalProfile({ entries, onDelete }) {
  const sentimentIcons = {
    positive: <FaSmile />,
    neutral: <FaMeh />,
    negative: <FaFrown />,
    unknown: <FaQuestion />,
  };

  const encouragements = {
    positive: "Great job! Keep shining! 🌟",
    neutral: "You're doing well, remember, you are special! 💫",
    negative:
      "It's okay to have tough days. You are loved and wanted. Keep going, you got this! 💪❤️",
    unknown: "Keep expressing yourself, you're valued! ❤️",
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Journal Entries</h2>
      {entries.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        entries.map((entry) => {
          const label = entry.sentiment_label?.toLowerCase() || "unknown";

          return (
            <div key={entry.id} className={styles.entryCard}>
              <div>
                <p>{entry.content}</p>
                <small>{new Date(entry.created_at).toLocaleString()}</small>
                <p>
                  <span
                    className={`${styles.emoji} ${styles[`${label}Emoji`]}`}
                  >
                    {sentimentIcons[label]}
                  </span>
                  <span className={styles[label]}>
                    {label} ({entry.sentiment_score})
                  </span>
                </p>
                <p className={styles.encouragement}>{encouragements[label]}</p>
              </div>
              <button onClick={() => onDelete(entry.id)}>Delete</button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default JournalProfile;
