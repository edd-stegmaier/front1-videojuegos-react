export default function Navbar({
  categoria,
  busqueda,
  totalUnidades,
  vistaCompacta,
  onCambiarCategoria,
  onCambiarBusqueda,
  onBuscar,
  onAlternarVista,
  onIrAlCarrito,
}) {
  return (
    <header className="navbar-pz sticky-top">
      <div className="container nav-inner">
        <a className="brand" href="#inicio" onClick={() => onCambiarCategoria("")}>
          <img
            src="https://raw.githubusercontent.com/edd-stegmaier/frontend1_videojuegos_s6/main/assets/img/logo.jpg"
            alt="Logo de PixelZone"
          />
          <span>
            <strong>PixelZone</strong>
            <small>Game Store</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Categorías">
          <button
            type="button"
            className={categoria === "" ? "activo" : ""}
            onClick={() => onCambiarCategoria("")}
          >
            Inicio
          </button>
          <button
            type="button"
            className={categoria === "Accion" ? "activo" : ""}
            onClick={() => onCambiarCategoria("Accion")}
          >
            Acción
          </button>
          <button
            type="button"
            className={categoria === "RPG" ? "activo" : ""}
            onClick={() => onCambiarCategoria("RPG")}
          >
            RPG
          </button>
        </nav>

        <form className="busqueda" role="search" onSubmit={onBuscar}>
          <label className="visually-hidden" htmlFor="input-busqueda">
            Buscar videojuegos
          </label>
          <input
            id="input-busqueda"
            type="search"
            placeholder="Buscar juego"
            value={busqueda}
            onChange={(evento) => onCambiarBusqueda(evento.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>

        <div className="nav-acciones">
          <button type="button" className="btn-vista" onClick={onAlternarVista}>
            {vistaCompacta ? "Vista detallada" : "Vista compacta"}
          </button>
          <button type="button" className="btn-carrito" onClick={onIrAlCarrito}>
            Carrito <span>{totalUnidades}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
