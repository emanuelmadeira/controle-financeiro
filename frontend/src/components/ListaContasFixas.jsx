import { useState } from "react";
import { formatMoney } from "../utils/format";
import { removerContaFixa, atualizarContaFixa, getContasFixas } from "../services/contasFixas";

export default function ListaContasFixas({ contas = [], atualizar }) {
  const [editIndex, setEditIndex] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const lista = Array.isArray(contas) ? contas : [];

  function iniciarEdicao(i, c) {
    setEditIndex(i);
    setDescricao(c.descricao);
    setValor(c.valor);
  }

  function salvar(id) {
    atualizarContaFixa(id, { descricao, valor: Number(valor) });
    atualizar(getContasFixas());
    setEditIndex(null);
  }

  function remover(id) {
    const confirmar = window.confirm("Tem certeza que deseja remover esta conta fixa?");
    if (!confirmar) return;

    removerContaFixa(id);
    atualizar(getContasFixas());
  }

  const total = lista.reduce((s, c) => s + c.valor, 0);

  return (
    <div className="lista">
      <h3>Contas Fixas</h3>

      {lista.map(c => (
        <div className="item" key={c.id}>
          {editIndex === c.id ? (
            <>
              <input
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                onKeyDown={e => e.key === "Enter" && salvar(c.id)}
              />

              <input
                type="number"
                value={valor}
                onChange={e => setValor(e.target.value)}
                onKeyDown={e => e.key === "Enter" && salvar(c.id)}
              />

              <button onClick={() => salvar(c.id)}>💾</button>
            </>
          ) : (
            <>
              <span>
                {c.descricao} — {formatMoney(c.valor)}
              </span>

              <span>
                <button onClick={() => iniciarEdicao(c.id, c)}>✏️</button>
                <button onClick={() => remover(c.id)}>❌</button>
              </span>
            </>
          )}
        </div>
      ))}

      <div className="total">
        Total: <strong>{formatMoney(total)}</strong>
      </div>
    </div>
  );
}
