// contasFixas.js
const KEY = "contasFixas";

export function getContasFixas() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function salvarContaFixa(conta) {
  const lista = getContasFixas();
  lista.push(conta);
  localStorage.setItem(KEY, JSON.stringify(lista));
}

// remover por ID
export function removerContaFixa(id) {
  const lista = getContasFixas().filter(c => c.id !== id);
  localStorage.setItem(KEY, JSON.stringify(lista));
}

// atualizar por ID
export function atualizarContaFixa(id, novo) {
  const lista = getContasFixas().map(c =>
    c.id === id ? { ...c, ...novo } : c
  );
  localStorage.setItem(KEY, JSON.stringify(lista));
}
