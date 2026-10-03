import { formatearPrecio } from "../utils/formato";

export default function ProductoCard({ producto, enCarrito, cantidad, vistaCompacta, onAgregar }) {
  return (
    <article className={`card-producto ${vistaCompacta ? "compacta" : ""}`}>
      <img src={producto.imagen} alt={producto.nombre} />
      <div className="card-cuerpo">
        <span className="badge">
          {producto.categoria === "Accion" ? "Acción" : producto.categoria} · {producto.plataforma}
        </span>
        <h3>{producto.nombre}</h3>
        {!vistaCompacta && <p className="descripcion">{producto.descripcion}</p>}
        <p className="rating">★ {producto.rating}</p>
        <div className="card-pie">
          <strong>{formatearPrecio(producto.precio)}</strong>
          <button
            type="button"
            className={enCarrito ? "en-carrito" : "agregar"}
            onClick={() => onAgregar(producto)}
          >
            {enCarrito ? `En el carrito (${cantidad})` : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </article>
  );
}
