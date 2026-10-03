import { formatearPrecio } from "../utils/formato";

export default function Carrito({
  carrito,
  totalUnidades,
  totalPrecio,
  onQuitar,
  onDisminuir,
  onAgregar,
  onVaciar,
}) {
  const vacio = carrito.length === 0;

  return (
    <aside className="lateral">
      <div className="panel">
        <h2>Categorías</h2>
        <p className="ayuda">Filtra el catálogo desde la barra superior o aquí abajo en móvil.</p>
      </div>

      <section id="carrito" className="panel carrito" aria-live="polite">
        <div className="carrito-encabezado">
          <h2>Resumen del carrito</h2>
          <span className="chip">{totalUnidades}</span>
        </div>

        {vacio ? (
          <p className="vacio">El carrito está vacío. Agrega un juego del catálogo.</p>
        ) : (
          <ul>
            {carrito.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.nombre}</strong>
                  <small>
                    x{item.cantidad} · {formatearPrecio(item.precio)}
                  </small>
                </div>
                <div className="item-acciones">
                  <span>{formatearPrecio(item.precio * item.cantidad)}</span>
                  <div>
                    <button type="button" onClick={() => onDisminuir(item.id)} aria-label={`Quitar una unidad de ${item.nombre}`}>
                      −
                    </button>
                    <button type="button" onClick={() => onAgregar(item)} aria-label={`Agregar otra unidad de ${item.nombre}`}>
                      +
                    </button>
                    <button type="button" className="quitar" onClick={() => onQuitar(item.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="total">
          <span>Total</span>
          <strong>{formatearPrecio(totalPrecio)}</strong>
        </div>
        <button type="button" className="vaciar" onClick={onVaciar} disabled={vacio}>
          Vaciar carrito
        </button>
      </section>
    </aside>
  );
}
