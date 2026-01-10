import { useState } from "react";
import {
  removerContaFixa,
  getContasFixas,
  atualizarContaFixa
} from "../services/contasFixas";
import { formatMoney } from "../utils/format";

export default function ListaContasFixas({ contas = [], atualizar }) {
  const [editIndex, setEditIndex] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
 const lista = Array.isArray(contas) ? contas : [];

  const totalFixas = lista.reduce(
    (soma, c) => soma + Number(c.valor),
    0
  );

  function iniciarEdicao(i, c) {
    setEditIndex(i);
    setDescricao(c.descricao);
    setValor(c.valor);
  }

  function salvar(i) {
    atualizarContaFixa(i, {
      descricao,
      valor: Number(valor)
    });

    atualizar(getContasFixas());
    setEditIndex(null);
  }

  return (
    <div className="lista">
      <h3>📌 Contas Fixas</h3>
      
      {contas.map((c, i) => (
        <div className="item" key={i}>
          {editIndex === i ? (
            <>
              <input
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                onKeyDown={e => e.key === "Enter" && salvar(i)}
              />

              <input
                type="number"
                value={valor}
                onChange={e => setValor(e.target.value)}
                onKeyDown={e => e.key === "Enter" && salvar(i)}
              />
              <button onClick={() => salvar(i)}>💾</button>
            </>
          ) : (
            <>
              <span>{c.descricao}</span>
          
              <span>
                {formatMoney(c.valor)}
                <button onClick={() => iniciarEdicao(i, c)}>✏️</button>
                <button onClick={() => {
                  removerContaFixa(i);
                  atualizar(getContasFixas());
                }}>❌</button>
              </span>
            </>
          )}
        </div>
      ))}
       {/* TOTAL */}
      <div className="item fixa total">
        <strong>Total contas fixas</strong>
        <strong>{formatMoney(totalFixas)}</strong>
      </div>
    </div>
  );
}

