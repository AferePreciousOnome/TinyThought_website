import express from "express";
import signUp from "../controllers/signup.js";
import login from "../controllers/login.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

export default router;
