import express from "express";
import { login, register, addOp, getOp } from "./controllers/controllers.js";
import { auth, registerAuth, operationAuth } from "./middleware/middleware.js";

const router = express.Router();

router.post("/login",auth, login);
router.post("/cadastro",registerAuth, register);
router.post("/nova-transacao/",operationAuth, addOp);
router.get("/transacoes/",operationAuth, getOp);

export default router