// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import Client from "../models/Client.js";

// // login de usuário
// export const loginUser = async (req, res) => {
//   try {
//     const { email, senha } = req.body;

//     const user = await Client.findOne({ email });
//     if (!user) return res.status(404).json({ msg: "Usuário não encontrado" });

//     const validPassword = await bcrypt.compare(senha, user.senha);
//     if (!validPassword) return res.status(400).json({ msg: "Senha inválida" });

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({ msg: "Login realizado com sucesso", token });
//   } catch (err) {
//     res.status(500).json({ msg: "Erro no login", error: err.message });
//   }
// };

// // middleware para validar token
// export const validateToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) return res.status(401).json({ msg: "Token não fornecido" });

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(403).json({ msg: "Token inválido ou expirado" });
//   }
// };

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Client from "../models/Client.js";

// login de usuário
export const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;
    console.log("📩 Tentando login:", email);

    const user = await Client.findOne({ email });
    if (!user) {
      console.warn("❌ Usuário não encontrado:", email);
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    const validPassword = await bcrypt.compare(senha, user.senha);
    if (!validPassword) {
      console.warn("❌ Senha inválida para:", email);
      return res.status(400).json({ msg: "Senha inválida" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("⚠️ JWT_SECRET não definido no .env");
      return res.status(500).json({ msg: "Configuração inválida no servidor" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ Login bem-sucedido:", email);
    res.json({ msg: "Login realizado com sucesso", token });
  } catch (err) {
    console.error("🚨 Erro no login:", err.message);
    res.status(500).json({ msg: "Erro no login", error: err.message });
  }
};

// middleware para validar token
export const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.warn("⚠️ Tentativa sem token");
    return res.status(401).json({ msg: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("🔑 Token válido para:", decoded.email);
    next();
  } catch (err) {
    console.error("🚨 Token inválido:", err.message);
    return res.status(403).json({ msg: "Token inválido ou expirado" });
  }
};

