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
