import { useState } from "react";
import { salvarLancamento, getLancamentos } from "../services/storage";
import { salvarContaFixa, getContasFixas } from "../services/contasFixas";

export default function FormLancamento({
  atualizarLancamentos,
  atualizarContas
}) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("despesa");

  function salvar(e) {
    e.preventDefault();
    if (!descricao || valor === "") return;

    if (tipo === "conta-fixa") {
      salvarContaFixa({
        id: Date.now(),
        descricao,
        valor: Number(valor)
      });

      atualizarContas(getContasFixas());
    } else {
      salvarLancamento({
        id: Date.now(),
        descricao,
        valor: Number(valor),
        tipo // receita | despesa
      });

      atualizarLancamentos(getLancamentos());
    }

    setDescricao("");
    setValor("");
    setTipo("despesa");
  }

  return (
    <form className="form" onSubmit={salvar}>
      <input
        placeholder="Descrição"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={e => setValor(e.target.value)}
        required
      />

      <select value={tipo} onChange={e => setTipo(e.target.value)}>
        <option value="receita">Receita</option>
        <option value="despesa">Despesa</option>
        <option value="conta-fixa">Conta fixa</option>
      </select>

      <button type="submit">Adicionar</button>
    </form>
  );
}
