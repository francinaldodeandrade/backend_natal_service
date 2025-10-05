<<<<<<< HEAD
// import app from "./src/app.js"

// const hostName = process.env.HOSTNAME
// const port = process.env.PORT

// app.listen (port, () =>{
//     console.log(`servidor executando no seguinte http://${hostName}:${port}`);
// })

import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import userRoutes from "./src/routes/userRoutes.js";
import clientRoutes from "./src/routes/clietRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

// Conectar ao MongoDB
connectDB();

// Rotas
app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);

const PORT = process.env.PORT || 3031;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
=======
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import app from "./src/app.js";

dotenv.config();

// conectar banco
connectDB();

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
>>>>>>> 2eda5205d21347beec58aa80450f99ac3f1bce97
