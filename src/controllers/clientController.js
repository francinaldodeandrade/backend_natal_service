// import bcrypt from "bcryptjs";
// import Client from "../models/Client.js";

// // registrar usuário (cadastro)
// export const registerUser = async (req, res) => {
//   try {
//     const { nome, email, senha } = req.body;

//     const existing = await Client.findOne({ email });
//     if (existing) return res.status(400).json({ msg: "Usuário já existe" });

//     const hashedPassword = await bcrypt.hash(senha, 10);

//     const client = new Client({ nome, email, senha: hashedPassword });
//     await client.save();

//     res.status(201).json({ msg: "Usuário registrado com sucesso", client });
//   } catch (err) {
//     res.status(500).json({ msg: "Erro ao registrar usuário", error: err.message });
//   }
// };

// // listar todos
// export const getClients = async (req, res) => {
//   const clients = await Client.find();
//   res.json(clients);
// };

// // buscar um cliente
// export const getClient = async (req, res) => {
//   const client = await Client.findById(req.params.id);
//   if (!client) return res.status(404).json({ msg: "Cliente não encontrado" });
//   res.json(client);
// };

// // atualizar cliente
// export const updateClient = async (req, res) => {
//   const { nome, email } = req.body;
//   const client = await Client.findByIdAndUpdate(
//     req.params.id,
//     { nome, email },
//     { new: true }
//   );
//   res.json(client);
// };

// // excluir cliente
// export const deleteClient = async (req, res) => {
//   await Client.findByIdAndDelete(req.params.id);
//   res.json({ msg: "Cliente removido com sucesso" });
// };


import Client from "../models/Client.js"; // seu model do Mongoose

// Criar novo cliente (Register)
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    const client = new Client({ name, email, password });
    await client.save();

    res.status(201).json({ message: "Cliente registrado com sucesso", client });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar cliente", error });
  }
};

// Buscar todos os clientes
const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar clientes", error });
  }
};

// Buscar cliente por ID
const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
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
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { name, email, password },
      { new: true }
    );

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
