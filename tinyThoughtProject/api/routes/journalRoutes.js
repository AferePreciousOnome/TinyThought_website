import express from "express";
import {
  createJournal,
  getJournals,
  getJournalById,
  deleteJournal,
} from "../controllers/journalControllers.js";

import authenticate from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticate, createJournal);
router.get("/", authenticate, getJournals);
router.get("/:id", authenticate, getJournalById);
router.delete("/:id", authenticate, deleteJournal);

export default router;
