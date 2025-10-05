import Client from "../models/clientModel.js";

// Criar cliente
export const createClient = async (req, res) => {
  try {
    const { nome, telefone, email } = req.body;
    const client = new Client({ nome, telefone, email });
    await client.save();
    res.status(201).json(client);
  } catch {
    res.status(500).json({ error: "Erro ao criar cliente" });
  }
};

// Listar clientes
export const getClients = async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
};

// Buscar por ID
export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ error: "Cliente não encontrado" });
    res.json(client);
  } catch {
    res.status(400).json({ error: "ID inválido" });
  }
};

// Atualizar
export const updateClient = async (req, res) => {
  try {
    const { nome, telefone, email } = req.body;
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { nome, telefone, email },
      { new: true }
    );
    if (!client) return res.status(404).json({ error: "Cliente não encontrado" });
    res.json(client);
  } catch {
    res.status(400).json({ error: "Erro ao atualizar" });
  }
};

// Deletar
export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ error: "Cliente não encontrado" });
    res.json({ message: "Cliente deletado" });
  } catch {
    res.status(400).json({ error: "Erro ao deletar" });
  }
};
