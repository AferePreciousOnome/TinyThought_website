import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import passwordRoute from "./routes/passwordRoute.js";

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("TinyThought API is live!");
});

app.use("/auth", authRoutes);
app.use("/journal", journalRoutes);
app.use("/auth", passwordRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
