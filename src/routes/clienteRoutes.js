import express from "express";
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient
} from "../controllers/clientController.js";

import { validateUser } from "../auth/validateUser.js";

const router = express.Router();

// Todas as rotas de clientes são protegidas
router.post("/", validateUser, createClient);
router.get("/", validateUser, getClients);
router.get("/:id", validateUser, getClientById);
router.put("/:id", validateUser, updateClient);
router.delete("/:id", validateUser, deleteClient);

export default router;
