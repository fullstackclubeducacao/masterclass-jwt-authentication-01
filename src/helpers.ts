import jwt from "jsonwebtoken";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmailValid = (email: string) => emailRegex.test(email);
export const isPasswordValid = (password: string) => password.length >= 6;

export const generateTokens = (userId: string) => {
  if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error("Missing JWT_SECRET or JWT_REFRESH_SECRET in .env file");
  }
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return { accessToken, refreshToken };
};
