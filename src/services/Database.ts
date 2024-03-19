import mongoose from "mongoose";
const URI = process.env.MONGO_URI;

if (!URI) {
  console.log("Please provide a Mongodb URI".red);
  process.exit(1);
}

export const initDB = async () => {
  try {
    await mongoose.connect(URI, { dbName: "rydeu" }).then((res) => {
      console.log("Database connected".blue.bold);
    });
  } catch (error) {
    console.log("Error connecting to Database".red + error);
  }
};
