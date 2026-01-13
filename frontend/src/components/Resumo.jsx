import { formatMoney } from "../utils/format";

export default function Resumo({ lancamentos, contasFixas = [] }) {
  const receitas = lancamentos
    .filter(l => l.tipo === "receita")
    .reduce((s, l) => s + l.valor, 0);

  const despesas = lancamentos
    .filter(l => l.tipo === "despesa")
    .reduce((s, l) => s + l.valor, 0);

  const totalFixas = contasFixas.reduce(
    (s, c) => s + c.valor,
    0
  );

  const saldo = receitas - despesas - totalFixas;

  return (
    <div className="cards">
      <div className="card">
        <h3>Saldo Inicial</h3>
        <p className="receita">{formatMoney(receitas)}</p>
      </div>

      <div className="card">
        <h3>Despesas</h3>
        <p className="despesa">{formatMoney(despesas)}</p>
      </div>

      <div className="card">
        <h3>Contas Fixas</h3>
        <p className="despesa">{formatMoney(totalFixas)}</p>
      </div>

      <div className="card">
        <h3>Saldo Restante</h3>
        <p className="saldo">{formatMoney(saldo)}</p>
      </div>
    </div>
  );
}