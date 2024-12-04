import mongoose from "mongoose";

const connect = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not set");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

export const UserModel = mongoose.model("User", userSchema);

connect();
