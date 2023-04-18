import express from "express";
import { login, register, addOp } from "./controllers/usersController.js";
import { auth, registerAuth } from "./middleware/middleware.js";

const router = express.Router();

router.post("/login",auth, login);
router.post("/cadastro",registerAuth, register);
router.post("/nova-transacao/:tipo", addOp);

export default router