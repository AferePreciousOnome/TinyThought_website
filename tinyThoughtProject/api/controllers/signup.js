import pool from "../db/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, password_hash)VALUES($1, $2) RETURNING id, email, created_at",
      [email, hashedPassword]
    );

    const user = result.rows[0];

    const token = generateToken(user.id);

    res.status(201).json({ user, token });
  } catch (err) {
    console.error("SignUp Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
export default signUp;
