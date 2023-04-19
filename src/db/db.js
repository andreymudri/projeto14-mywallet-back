import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();



async function connectDB(){
  const mongoClient = new MongoClient(process.env.DATABASE_URL);
  await mongoClient.connect();  
  console.log("Db connected")
  return mongoClient.db();
}

export const db = await connectDB();
export default connectDB;