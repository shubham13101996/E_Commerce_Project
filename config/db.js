import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected To  Mongo Database  ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in connecting to the database`, error.message);
  }
};

export default connectDB;
