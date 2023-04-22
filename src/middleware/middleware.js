import joi from "joi";
import {
  registerSchema,
  loginSchema,
  operationSchema,
  createOpSchema,
} from "../schemas/schematics.js";
import bcrypt from "bcrypt";
import { db } from "../db/db.js";
async function auth(req, res, next) {
  try {
    const { authorization } = req.headers;
    const usertoken = authorization?.replace("Bearer ", "");

    const { email, password } = req.body;
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(422).send(error);
    if (usertoken) {
      const confirmToken = await db
        .collection("sessions")
        .findOne({ usertoken });
      if (confirmToken) next();
    }
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid username");
    } else {
      const match = bcrypt.compareSync(password, user.password);
      if (!match) {
        return res.status(401).send("Incorrect password");
      } else {
        next();
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
async function registerAuth(req, res, next) {
  try {
    const { email } = req.body;
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(422).send(error);

    const user = await db.collection("users").findOne({ email });
    if (user) return res.status(409).send("Email já cadastrado");
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

async function operationAuth(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  try {
    const operation = req.body;
    const { error } = operationSchema.validate(operation);
    
    if (error) return res.status(422).send(error);
    const userSession = await db.collection("sessions").findOne({ token });
    if (!userSession) return res.status(401).send("Token inválido");
    const userInDB = await db
      .collection("users")
      .findOne({ email: userSession.email });
    if (userInDB) return next();
    return res.status(401).send("Unauthorized");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

async function authNewOp(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  try {
    const operation = req.body;
    const { error } = createOpSchema.validate(operation);
    if (error) return res.status(422).send(error);
    const userSession = await db.collection("sessions").findOne({ token });
    if (!userSession) return res.status(401).send("Token inválido");
    const userInDB = await db
    .collection("users")
    .findOne({ email: userSession.email });
  if (userInDB) return next();

  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

export { auth, registerAuth, operationAuth ,authNewOp};
