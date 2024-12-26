/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  request: Request,
  res: Response,
  next: NextFunction
) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }
  try {
    console.log("auth middleware");
    const accessToken = request.headers.authorization?.split("Bearer ")[1];
    if (!accessToken) {
      res.status(401).send({
        message: "Unauthorized",
      });
    }
    const tokenPayload = jwt.verify(accessToken!, process.env.JWT_SECRET) as {
      userId: string;
    };
    (request as any).userId = tokenPayload.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};
