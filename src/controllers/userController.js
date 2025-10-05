import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { saveToken } from "../auth/validateCliet.js";

// Registrar novo usuário
export const registerUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email já registrado" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    const user = new User({ nome, email, senha: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch {
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "Credenciais inválidas" });

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(400).json({ error: "Credenciais inválidas" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    saveToken(token);

    res.json({ token });
  } catch {
    res.status(500).json({ error: "Erro no login" });
  }
};
