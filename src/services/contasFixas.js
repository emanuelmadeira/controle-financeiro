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

export function removerContaFixa(index) {
  const lista = getContasFixas();
  lista.splice(index, 1);
  localStorage.setItem(KEY, JSON.stringify(lista));
}

export function atualizarContaFixa(index, novo) {
  const lista = getContasFixas();
  lista[index] = { ...lista[index], ...novo };
  localStorage.setItem(KEY, JSON.stringify(lista));
}
