import mongoose from "mongoose";

export const mongoDbConnection = () => {
  try {
    mongoose.connect(process.env.MONOGO_DB_CONNECTION_URI);
    console.log("DB connection successful.");
  } catch (error) {
    console.error("Connection failed, ", error);
  }
};
