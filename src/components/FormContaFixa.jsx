import { useState } from "react";
import { salvarContaFixa, getContasFixas } from "../services/contasFixas";

export default function FormContaFixa({ atualizar }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    salvarContaFixa({
      descricao,
      valor: Number(valor)
    });

    atualizar(getContasFixas());
    setDescricao("");
    setValor("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Conta fixa (ex: Aluguel)"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Valor mensal"
        value={valor}
        onChange={e => setValor(e.target.value)}
        required
      />

      <button>Adicionar</button>
    </form>
  );
}
