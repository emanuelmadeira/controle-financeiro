import { useState, useEffect } from "react";

// Lancamentos (receitas / despesas)
import { getLancamentos } from "../services/storage";
import FormLancamento from "../components/FormLancamento";
import ListaLancamentos from "../components/ListaLancamentos";
import Resumo from "../components/Resumo";

// Contas fixas
import { getContasFixas } from "../services/contasFixas";
import FormContaFixa from "../components/FormContaFixa";
import ListaContasFixas from "../components/ListaContasFixas";
import ListaReceitas from "../components/ListaReceitas";
import ListaDespesas from "../components/ListaDespesas";
// Tema
import { getTheme, setTheme } from "../services/theme";

export default function Dashboard() {
  const [lancamentos, setLancamentos] = useState([]);
  const [contasFixas, setContasFixas] = useState([]);
  const [theme, setThemeState] = useState(getTheme());

  useEffect(() => {
    setLancamentos(getLancamentos());
    setContasFixas(getContasFixas());
    document.body.className = theme;
  }, [theme]);

  function toggleTheme() {
    const novo = theme === "light" ? "dark" : "light";
    setThemeState(novo);
    setTheme(novo);
  }

  return (
    <div className="container">
      {/* Cabeçalho */}
      <header className="header">
        <h1>💰 Controle Financeiro</h1>
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      {/* Resumo */}
      <Resumo lancamentos={lancamentos} contasFixas={contasFixas} />

      {/* Lançamentos */}
      <FormLancamento atualizar={setLancamentos} />
      <ListaLancamentos
        lancamentos={lancamentos}
        atualizar={setLancamentos}
      />

      {/* Contas Fixas */}
      <FormContaFixa atualizar={setContasFixas} />
      <ListaContasFixas
        contas={contasFixas}
        atualizar={setContasFixas}
      />
        <ListaReceitas
        lancamentos={lancamentos}
        atualizar={setLancamentos}
      />

      <ListaDespesas
        lancamentos={lancamentos}
        atualizar={setLancamentos}
      />
    </div>
  );
}
