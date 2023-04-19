import express from "express";
import { login, register, addOp } from "./controllers/controller.js";
import { auth, registerAuth, operationAuth } from "./middleware/middleware.js";

const router = express.Router();

router.post("/login",auth, login);
router.post("/cadastro",registerAuth, register);
router.post("/nova-transacao/:tipo",operationAuth, addOp);

export default router