import axios from "axios";
const API_URL = "http://localhost:5000/lancamentos";


export const api = axios.create({
  baseURL: "http://localhost:5000",
});

useEffect(() => {
  api.get("/lancamentos")
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
}, []);


export async function listarLancamentos() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function criarLancamento(dados) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });
  return res.json();
}

export async function removerLancamento(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}

export async function editarLancamento(id, dados) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });
}
