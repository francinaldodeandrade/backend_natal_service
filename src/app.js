import express from "express";
import cors from "cors";
import clientRoutes from "./routes/clientRoutes.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rotas
app.use("/api/clients", clientRoutes);

export default app;

