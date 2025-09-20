import bcrypt from "bcryptjs";
import Client from "../models/clientModel.js";

// Criar novo cliente (Register)
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = new Client({ name, email, password: hashedPassword });
    await client.save();

    res.status(201).json({ message: "Cliente registrado com sucesso", client });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar cliente", error });
  }
};

// Buscar todos os clientes
const getClients = async (req, res) => {
  try {
    const clients = await Client.find().select("-password"); // não expor senha
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar clientes", error });
  }
};

// Buscar cliente por ID
const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).select("-password");
    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar cliente", error });
  }
};

// Atualizar cliente por ID
const updateClient = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updateData = { name, email };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const client = await Client.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    res.status(200).json({ message: "Cliente atualizado com sucesso", client });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar cliente", error });
  }
};

// Deletar cliente por ID
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
    res.status(200).json({ message: "Cliente removido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover cliente", error });
  }
};

export { registerUser, getClients, getClient, updateClient, deleteClient };
