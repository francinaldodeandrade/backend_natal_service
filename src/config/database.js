import mongoose from "mongoose";

let reconnectAttempts = 0;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    reconnectAttempts = 0; // zera contador após conexão bem-sucedida
    console.log("✅ MongoDB conectado");
  } catch (err) {
    reconnectAttempts++;
    console.error(`❌ Erro ao conectar MongoDB (tentativa ${reconnectAttempts}):`, err.message);
    setTimeout(connectDB, 5000); // tenta reconectar em 5 segundos
  }
};

// Eventos extras de monitoramento
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB desconectado. Tentando reconectar...");
  connectDB();
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB reconectado com sucesso!");
});

mongoose.connection.on("error", (err) => {
  console.error("🚨 Erro na conexão com MongoDB:", err.message);
});

export default connectDB;


// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB conectado");
//   } catch (err) {
//     console.error("❌ Erro ao conectar MongoDB:", err.message);
//     process.exit(1); // encerra o servidor se não conseguir conectar
//   }
// };

// export default connectDB;

