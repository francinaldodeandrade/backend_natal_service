import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Client from "../models/clientModel.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📩 Tentando login:", email);

    const user = await Client.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Senha inválida" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ msg: "Login realizado com sucesso", token });
  } catch (err) {
    res.status(500).json({ msg: "Erro no login", error: err.message });
  }
};

export const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Token inválido ou expirado" });
  }
};

