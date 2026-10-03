import ProductoCard from "./ProductoCard";
import { etiquetaCategoria } from "../utils/formato";

export default function Catalogo({
  productos,
  cargando,
  error,
  categoria,
  busqueda,
  carrito,
  vistaCompacta,
  onAgregar,
  onCambiarCategoria,
}) {
  const titulo = busqueda.trim()
    ? `Resultados para “${busqueda.trim()}”`
    : etiquetaCategoria(categoria);

  return (
    <section id="catalogo" className="catalogo">
      <div className="catalogo-encabezado">
        <h2>{titulo}</h2>
        <p>
          {cargando
            ? "Cargando datos..."
            : `${productos.length} juego${productos.length === 1 ? "" : "s"}`}
        </p>
      </div>

      {cargando && (
        <p className="aviso aviso-info" role="status">
          Cargando catálogo desde el archivo JSON...
        </p>
      )}

      {!cargando && error && (
        <p className="aviso aviso-error" role="alert">
          No pudimos cargar el catálogo. Revisa que <code>public/data/productos.json</code> exista
          y vuelve a intentar. Detalle: {error}
        </p>
      )}

      {!cargando && !error && productos.length === 0 && (
        <p className="aviso">No hay productos que coincidan con la búsqueda.</p>
      )}

      {!cargando && !error && productos.length > 0 && (
        <div className={`grilla ${vistaCompacta ? "grilla-compacta" : ""}`}>
          {productos.map((producto) => {
            const item = carrito.find((entrada) => entrada.id === producto.id);
            return (
              <ProductoCard
                key={producto.id}
                producto={producto}
                enCarrito={Boolean(item)}
                cantidad={item?.cantidad ?? 0}
                vistaCompacta={vistaCompacta}
                onAgregar={onAgregar}
              />
            );
          })}
        </div>
      )}

      <div className="filtros-movil">
        <button type="button" onClick={() => onCambiarCategoria("")}>
          Todas
        </button>
        <button type="button" onClick={() => onCambiarCategoria("Accion")}>
          Acción
        </button>
        <button type="button" onClick={() => onCambiarCategoria("RPG")}>
          RPG
        </button>
      </div>
    </section>
  );
}
