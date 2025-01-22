import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbName = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

async function main() {
  await mongoose.connect(
    `mongodb+srv://${username}:${password}@has.3480r.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
  );
}

main()
  .then(() => {
    console.log(`Hasanali's ${dbName} database connected`);
  })
  .catch((err) => console.log(err));
