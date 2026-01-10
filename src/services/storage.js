const KEY = "lancamentos";

export function getLancamentos() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function salvarLancamento(lancamento) {
  const lista = getLancamentos();
  lista.push(lancamento);
  localStorage.setItem(KEY, JSON.stringify(lista));
}

export function removerLancamento(index) {
  const lista = getLancamentos();
  lista.splice(index, 1);
  localStorage.setItem(KEY, JSON.stringify(lista));
}

export function atualizarLancamento(index, novo) {
  const lista = getLancamentos();
  lista[index] = { ...lista[index], ...novo };
  localStorage.setItem(KEY, JSON.stringify(lista));
}
