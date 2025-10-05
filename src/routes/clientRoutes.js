import express from "express";
import { registerUser, getClients, getClient, updateClient, deleteClient } from "../controllers/clientController.js";
import { loginUser, validateToken } from "../auth/authController.js";

const router = express.Router();

// autenticação
router.post("/register", registerUser);
router.post("/login", loginUser);

// CRUD (protegido com token)
router.get("/", validateToken, getClients);
router.get("/:id", validateToken, getClient);
router.put("/:id", validateToken, updateClient);
router.delete("/:id", validateToken, deleteClient);

export default router;
