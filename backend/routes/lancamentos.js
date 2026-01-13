import express from "express";
import Lancamento from "../models/Lancamento.js";

const router = express.Router();

/* LISTAR */
router.get("/", async (req, res) => {
  const dados = await Lancamento.find().sort({ createdAt: -1 });
  res.json(dados);
});

/* CRIAR */
router.post("/", async (req, res) => {
  const novo = await Lancamento.create(req.body);
  res.status(201).json(novo);
});

/* ATUALIZAR */
router.put("/:id", async (req, res) => {
  const atualizado = await Lancamento.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(atualizado);
});

/* REMOVER */
router.delete("/:id", async (req, res) => {
  await Lancamento.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
