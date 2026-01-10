import { useState } from "react";
import { formatMoney } from "../utils/format";

export default function ListaDespesas({ lancamentos = [], atualizar }) {
  const [editIndex, setEditIndex] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const despesas = lancamentos.filter(
    l => l.tipo === "despesa" || l.tipo === "conta-fixa"
  );

  function iniciarEdicao(i, l) {
    setEditIndex(i);
    setDescricao(l.descricao);
    setValor(l.valor);
  }

  function salvar(id) {
    atualizar(
      lancamentos.map(l =>
        l.id === id
          ? { ...l, descricao, valor: Number(valor) }
          : l
      )
    );
    setEditIndex(null);
  }

  function remover(id) {
    atualizar(lancamentos.filter(l => l.id !== id));
  }

  const total = despesas.reduce((s, l) => s + l.valor, 0);

  return (
    <div className="lista">
      <h3>Despesas</h3>

      {despesas.map(l => (
        <div className="item" key={l.id}>
          {editIndex === l.id ? (
            <>
              <input
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                onKeyDown={e => e.key === "Enter" && salvar(l.id)}
              />

              <input
                type="number"
                value={valor}
                onChange={e => setValor(e.target.value)}
                onKeyDown={e => e.key === "Enter" && salvar(l.id)}
              />

              <button onClick={() => salvar(l.id)}>💾</button>
            </>
          ) : (
            <>
              <span>
                {l.descricao} — {formatMoney(l.valor)}
              </span>

              <span>
                
                <button onClick={() => iniciarEdicao(l.id, l)}>✏️</button>
                <button onClick={() => remover(l.id)}>❌</button>
              </span>
            </>
          )}
        </div>
      ))}

      <div className="total">
        Total: <strong>{formatMoney(-1*total)}</strong>
      </div>
    </div>
  );
}
