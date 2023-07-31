import mongoose from "mongoose";

const connectionString = process.env.MONGO_URI;

export const connect = () =>
  mongoose.connect(connectionString);
