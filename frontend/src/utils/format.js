export function formatMoney(valor) {
  if (typeof valor !== "number") return "R$ 0,00";

  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
