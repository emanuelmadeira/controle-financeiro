import mongoose from "mongoose";

const LancamentoSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  tipo: {
    type: String,
    enum: ["receita", "despesa", "conta-fixa"],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Lancamento", LancamentoSchema);
