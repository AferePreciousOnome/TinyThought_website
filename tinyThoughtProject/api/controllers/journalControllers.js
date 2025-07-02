import Sentiment from "sentiment";
import pool from "../db/db.js";

const sentiment = new Sentiment();

export const createJournal = async (req, res) => {
  const { content } = req.body;
  const userId = req.userId;

  try {
    const resultAnalysis = sentiment.analyze(content);
    const sentimentScore = resultAnalysis.score;
    const sentimentLabel =
      sentimentScore > 0
        ? "positive"
        : sentimentScore < 0
        ? "negative"
        : "neutral";

    const result = await pool.query(
      `INSERT INTO journal_entries (user_id, content, sentiment_score, sentiment_label)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, content, sentimentScore, sentimentLabel]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating journal:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const getJournals = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await pool.query(
      "SELECT * FROM journal_entries WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching journals:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const getJournalById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const result = await pool.query(
      "SELECT * FROM journal_entries WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching journal by ID:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteJournal = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const result = await pool.query(
      "DELETE FROM journal_entries WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (err) {
    console.error("Error deleting journal:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
