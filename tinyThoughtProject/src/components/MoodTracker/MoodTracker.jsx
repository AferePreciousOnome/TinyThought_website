import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./MoodTracker.module.css";

const sentimentScore = {
  positive: 2,
  neutral: 1,
  negative: 0,
};

function MoodTracker({ entries }) {
  const last7 = entries
    .filter((entry) => {
      const entryDate = new Date(entry.created_at);
      const today = new Date();
      const daysAgo = (today - entryDate) / (1000 * 60 * 60 * 24);
      return daysAgo <= 6;
    })
    .map((entry) => {
      const label = entry.sentiment_label?.toLowerCase() || "neutral";
      return {
        date: new Date(entry.created_at).toLocaleDateString(undefined, {
          weekday: "short",
        }),
        mood: sentimentScore[label] ?? 1,
      };
    });

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Mood Tracker (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={last7}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis ticks={[0, 1, 2]} domain={[0, 2]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#9575cd"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MoodTracker;
