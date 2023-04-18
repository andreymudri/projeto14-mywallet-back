import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { db } from "../db/db.js";
import joi from "joi";
import { registerSchema, loginSchema } from "../schemas/userSchemas.js";

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
    try { 
        const { email, password } = req.body;
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(422).send(error);
        const usuario = await db.collection("users").findOne({ email: email });
        if (!usuario) return res.status(401).send("Failed to complete action."); // não existente
        const match = await bcrypt.compare(password, usuario.password);
        if (!match) return res.status(401).json({ message: 'Incorrect password' }); // senha incorreta
        const token = uuidv4();
        const user = { token, name: usuario.name, email: usuario.email, password };


        res.status(200).send(token)
    }
    catch (err)
    {
        console.log(err);
        return res.status(500).send(err);
    }
};

async function addOp(req, res) {
    const user = req.headers.user;
    const operation = req.params
    try { 

    } catch (err) {
        
    }
    /* ('/nova-transacao/:tipo', addOp); */

};

export { login, register, addOp };