import express from "express";
import { login, register, addOp, getOp } from "./controllers/controllers.js";
import { auth, registerAuth, operationAuth,authNewOp } from "./middleware/middleware.js";

const router = express.Router();

router.post("/login",auth, login);
router.post("/cadastro",registerAuth, register);
router.post("/nova-transacao",authNewOp, addOp);
router.get("/transacoes", operationAuth, getOp);

export default router