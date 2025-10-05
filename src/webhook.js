import express from "express";
import { exec } from "child_process";

const router = express.Router();

router.post("/", (req, res) => {
  console.log("📩 Webhook recebido do GitHub!");

  exec("bash /var/www/api_natalService/deploy.sh", (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Erro no deploy: ${error.message}`);
      return res.status(500).send("Erro no deploy");
    }
    console.log(`✅ Deploy output: ${stdout}`);
    res.status(200).send("Deploy executado com sucesso!");
  });
});

export default router;
