import express from "express";
import { login, register, addOp } from "./controllers/usersController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/nova-transacao/:tipo", addOp);

export default router