import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalogo from "./components/Catalogo";
import Carrito from "./components/Carrito";
import { SLIDES } from "./data/slides";
import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [vistaCompacta, setVistaCompacta] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    let activo = true;

    async function cargarCatalogo() {
      try {
        await new Promise((resolver) => setTimeout(resolver, 600));
        const respuesta = await fetch("/data/productos.json");
        if (!respuesta.ok) {
          throw new Error(`Respuesta no válida (${respuesta.status})`);
        }
        const datos = await respuesta.json();
        if (!Array.isArray(datos) || datos.length === 0) {
          throw new Error("El JSON no contiene productos.");
        }
        if (activo) setProductos(datos);
      } catch (err) {
        if (activo) setError(err.message);
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarCatalogo();
    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((actual) => (actual + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const termino = busqueda.trim().toLowerCase();
  const productosVisibles = productos.filter((producto) => {
    const coincideCategoria = !categoria || producto.categoria === categoria;
    const coincideBusqueda = !termino || producto.nombre.toLowerCase().includes(termino);
    return coincideCategoria && coincideBusqueda;
  });

  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  function agregarAlCarrito(producto) {
    setCarrito((actual) => {
      const existente = actual.find((item) => item.id === producto.id);
      if (existente) {
        return actual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        );
      }
      return [
        ...actual,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
        },
      ];
    });
  }

  function quitarDelCarrito(id) {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
  }

  function disminuirCantidad(id) {
    setCarrito((actual) =>
      actual
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
        .filter((item) => item.cantidad > 0),
    );
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  function manejarBusqueda(evento) {
    evento.preventDefault();
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  }

  function irAlCarrito() {
    document.getElementById("carrito")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Navbar
        categoria={categoria}
        busqueda={busqueda}
        totalUnidades={totalUnidades}
        vistaCompacta={vistaCompacta}
        onCambiarCategoria={setCategoria}
        onCambiarBusqueda={setBusqueda}
        onBuscar={manejarBusqueda}
        onAlternarVista={() => setVistaCompacta((actual) => !actual)}
        onIrAlCarrito={irAlCarrito}
      />

      <main className="container">
        <Hero
          indice={slide}
          onCambiarIndice={setSlide}
          onVerCategoria={(nueva) => {
            setCategoria(nueva);
            setBusqueda("");
            document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        <div className="layout">
          <Carrito
            carrito={carrito}
            totalUnidades={totalUnidades}
            totalPrecio={totalPrecio}
            onQuitar={quitarDelCarrito}
            onDisminuir={disminuirCantidad}
            onAgregar={agregarAlCarrito}
            onVaciar={vaciarCarrito}
          />
          <Catalogo
            productos={productosVisibles}
            cargando={cargando}
            error={error}
            categoria={categoria}
            busqueda={busqueda}
            carrito={carrito}
            vistaCompacta={vistaCompacta}
            onAgregar={agregarAlCarrito}
            onCambiarCategoria={setCategoria}
          />
        </div>
      </main>

      <footer>
        <div className="container footer-grid">
          <div>
            <h3>Contacto</h3>
            <p>soporte@pixelzone.cl</p>
            <p>+56 9 1234 5678</p>
          </div>
          <div>
            <h3>Redes</h3>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer">
              Discord
            </a>
          </div>
          <div>
            <h3>PixelZone</h3>
            <p>Tienda de videojuegos adaptada a React con hooks y carrito dinámico.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
