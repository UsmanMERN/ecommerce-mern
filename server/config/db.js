import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`DB is Connected ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Error while connecting DB ${error}`);
  }
};

// export default connectDB;
