import mongoose from "mongoose";

export const initialDb = async () => {
  try {
    const uri = process.env.MONGO_URL!;
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Stop app if DB fails
  }
};
