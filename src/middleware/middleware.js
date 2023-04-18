import joi from "joi";
import { registerSchema, loginSchema } from "../schemas/userSchemas.js";


async function auth(req, res) {
    try {
        const usertoken = req.headers.token;
        const { username, password } = req.body;
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(422).send(error);        
    if (usertoken) {
        const confirmToken = await db.users.findOne({ usertoken })
        if (confirmToken) next();
    }
    const user = await db.users.findOne({ username });
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
async function registerAuth(req, res) {
    try {
        const { name, email, password } = req.body;
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(422).send(error);

        const user = await db.users.findOne({ email });        
        if (user) return res.status(409).send("Email já cadastrado")

        next();
        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
}


export { auth, registerAuth };