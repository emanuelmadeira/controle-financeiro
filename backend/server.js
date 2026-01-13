import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import lancamentosRoutes from "./routes/lancamentos.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB Atlas"))
  .catch(err => console.error("❌ Erro Mongo:", err));

app.use("/lancamentos", lancamentosRoutes);

app.listen(5000, () =>
  console.log("🚀 Servidor rodando na porta 5000")
);
