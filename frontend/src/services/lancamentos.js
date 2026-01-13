import { api } from "./api";

export async function getLancamentos() {
  const { data } = await api.get("/lancamentos");
  return data;
}

export async function salvarLancamento(lancamento) {
  await api.post("/lancamentos", lancamento);
}

export async function atualizarLancamento(id, dados) {
  await api.put(`/lancamentos/${id}`, dados);
}

export async function removerLancamento(id) {
  await api.delete(`/lancamentos/${id}`);
}
