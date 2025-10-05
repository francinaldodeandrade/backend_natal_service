<<<<<<< HEAD
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// // Carrega variáveis do .env
// dotenv.config();

// // Pega a URI do MongoDB Atlas
// const uri = process.env.MONGO_URI;

// // Função para validar a URI
// const validateUri = () => {
//   if (!uri) {
//     console.error(
//       "❌ Erro: A variável de ambiente MONGO_URI não está definida!\n" +
//       "→ Crie um arquivo .env na raiz do projeto com a linha:\n" +
//       "   MONGO_URI='sua_uri_do_mongodb_atlas'"
//     );
//     process.exit(1); // encerra o processo com erro
//   }
// };

// // Função de conexão com reconexão automática
// const connect = async () => {
//   try {
//     validateUri();

//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("✅ Conectado ao MongoDB Atlas com sucesso!");

//     mongoose.connection.on("error", (err) => {
//       console.error("❌ Erro na conexão com o MongoDB:", err);
//     });

//     mongoose.connection.on("disconnected", () => {
//       console.warn("⚠️ Conexão com MongoDB perdida. Tentando reconectar em 5s...");
//       setTimeout(connect, 5000);
//     });

//   } catch (err) {
//     console.error("❌ Falha ao conectar ao MongoDB:", err);
//     console.log("🔁 Tentando reconectar em 5 segundos...");
//     setTimeout(connect, 5000);
//   }
// };

// // Exporta a função de conexão
// export default { connect };


import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ Erro ao conectar no MongoDB:", err.message);
    process.exit(1);
  }
};

export default connectDB;
=======
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

>>>>>>> 2eda5205d21347beec58aa80450f99ac3f1bce97
