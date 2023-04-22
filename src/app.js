import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes.js";
import connectDB from "./db/db.js";



const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(router);

connectDB().then(() => {
    const PORT = 5000;
    app.listen(process.env.PORT, () => console.log(`Server running on port ${PORT}`));
  });