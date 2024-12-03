import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bcrypt from "bcryptjs";
import "./database";
import { UserModel } from "./database";
import { generateTokens, isEmailValid, isPasswordValid } from "./helpers";

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!isEmailValid(email)) {
      res.status(400).json({
        message: "Invalid email",
      });
    }
    if (!isPasswordValid(password)) {
      res.status(400).json({
        message: "Invalid password",
      });
    }
    //   criptografar a minha senha
    const hashedPassword = bcrypt.hashSync(password, 10);
    // preciso salvar isso no meu banco de dados
    const user = await UserModel.create({
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ email, tokens: generateTokens(user._id.toString()) });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.error(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //   buscar usuário por e-mail
  const user = await UserModel.findOne({
    email,
  });
  if (!user) {
    res.status(400).json({
      message: "Invalid email or password",
    });
  }
  // verificar se a senha está correta
  const isPasswordValid = bcrypt.compare(password, user!.password);

  if (!isPasswordValid) {
    res.status(400).json({
      message: "Invalid email or password",
    });
  }
  //   gerar tokens de autenticação
  res.status(200).json({
    email,
    tokens: generateTokens(user!._id.toString()),
  });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
