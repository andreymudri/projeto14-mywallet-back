import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { db } from "../db/db.js";
import joi from "joi";
import { registerSchema, loginSchema } from "../schemas/userSchemas.js";




async function register(req, res) {
    try {
    const { name, email, password } = req.body;
    const usuario = await db.collection("users").findOne({ email });
    if (usuario) return res.status(409).send("Failed to complete action.")
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
        const { authorization } = req.headers.token;
        const usertoken = authorization?.replace("Bearer ", "");

        const { email, password } = req.body;
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(422).send(error);
        const usuario = await db.collection("users").findOne({ email: email });
        if (!usuario) return res.status(404).send("Email does not exist."); // não existente
        const match = bcrypt.compareSync(password, usuario.password);
        if (!match) return res.status(401).send("Incorrect password"); // senha incorreta
        if (!usertoken) {usertoken = uuidv4();} //user token vazio -> gera token        
        const userToken = { user, token: usertoken };
        const checktoken = await db.collection("sessions").findOne({ email });
        if (checktoken) {
            db.collection("sessions").updateOne(userToken);
        } else {
            await db.collection("sessions").insertOne(userToken)
         }
        return res.status(200).json({ token });
    }
    catch (err)    {
        console.log(err);
        return res.status(500).send(err);
    }
};

async function addOp(req, res) {
    const usertoken = req.headers.token;
    const operation = req.params
    try { 


    } catch (err) {
        
    }
    /* ('/nova-transacao/:tipo', addOp); */

};

export { login, register, addOp };