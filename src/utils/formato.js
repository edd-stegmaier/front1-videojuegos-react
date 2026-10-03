export function formatearPrecio(valor) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(valor);
}

export function etiquetaCategoria(categoria) {
  if (categoria === "Accion") return "Acción";
  return categoria || "Catálogo";
}
