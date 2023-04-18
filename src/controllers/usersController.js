import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { db } from "../db/db.js";
import joi from "joi";
import { registerSchema } from "../schemas/userSchemas.js";

async function register(req, res) {
    try {
    const { name, email, password } = req.body;
    const { error } = registerSchema.validate(req.body);
    const usuario = await db.collection("users").findOne({ name: from });
    if (usuario) return res.status(409).send("Failed to complete action.")
    if (error) return res.status(422).send(error);
    const hashedpw = bcrypt.hashSync(password, 10);
    const user = { name, email, password: hashedpw };

        await db.collection("users").insertOne(user)
         return res.status(201).send('User created Successfully')
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }

};

async function login(req, res) {
     
};

async function addOp(req, res) {
    /* ('/nova-transacao/:tipo', addOp); */

};

export { login, register, addOp };