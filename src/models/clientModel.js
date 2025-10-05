import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  telefone: { type: String, required: true },
  email: { type: String }
});

export default mongoose.model("Client", clientSchema);
