import joi from "joi";
import { registerSchema, loginSchema } from "../schemas/userSchemas.js";
import bcrypt from "bcrypt"
import { db } from "../db/db.js";
async function auth(req, res, next) {
    try {
        const { authorization } = req.headers.token;
        const usertoken = authorization?.replace("Bearer ", "");

        const { email, password } = req.body;
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(422).send(error);        
    if (usertoken) {
        const confirmToken = await db.collection("users").findOne({ usertoken })
        if (confirmToken) next();
    }
    const user = await db.collection("users").findOne({ email });
    if (!user) {
        return res.status(401).send("Invalid username");
    } else {
        const match = bcrypt.compareSync(password, user.password);
        if (!match) {
            return res.status(401).send("Incorrect password");
        }
        else {
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
        const { name, email, password } = req.body;
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(422).send(error);


        const user = await db.collection("users").findOne({ email });
        if (user) return res.status(409).send("Email já cadastrado")
        next();
        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
}


export { auth, registerAuth };