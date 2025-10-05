import mongoose from "mongoose";

<<<<<<< HEAD
const clientSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  telefone: { type: String, required: true },
  email: { type: String }
});

export default mongoose.model("Client", clientSchema);
=======
const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);


export default mongoose.model("Client", clientSchema);


>>>>>>> 2eda5205d21347beec58aa80450f99ac3f1bce97
