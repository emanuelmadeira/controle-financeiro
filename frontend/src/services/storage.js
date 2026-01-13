// storage.js
const KEY = "lancamentos";

export function getLancamentos() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function salvarLancamento(lancamento) {
  const lista = getLancamentos();
  lista.push(lancamento);
  localStorage.setItem(KEY, JSON.stringify(lista));
}

// remover por ID
export function removerLancamento(id) {
  const lista = getLancamentos().filter(l => l.id !== id);
  localStorage.setItem(KEY, JSON.stringify(lista));
}

// atualizar por ID
export function atualizarLancamento(id, novo) {
  const lista = getLancamentos().map(l =>
    l.id === id ? { ...l, ...novo } : l
  );
  localStorage.setItem(KEY, JSON.stringify(lista));
}
