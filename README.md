# PixelZone — front1-videojuegos-react

Adaptación a React de la tienda [frontend1_videojuegos_s6](https://github.com/edd-stegmaier/frontend1_videojuegos_s6). El catálogo, la búsqueda, las categorías y el carrito pasan a gestionarse con hooks.

## Cómo verla

```bash
npm install
npm run dev
```

Abrir la URL que indique Vite (por defecto `http://localhost:5173/front1-videojuegos-react/`).

## Requisitos cubiertos

- Lista de productos cargada de forma dinámica desde `public/data/productos.json`.
- Agregar y eliminar productos del carrito, con cantidad y total en pesos chilenos.
- Contador de unidades en el navbar y en el resumen del carrito.
- `useState` para el catálogo, el carrito y un control interactivo (el botón alterna entre "Vista compacta" y "Vista detallada").
- `useEffect` para simular la carga externa, actualizar el estado al recibir los datos y rotar el hero.
- Renderizado condicional: mensaje si el carrito está vacío, aviso de carga o error, y el botón del producto cambia de "Agregar al carrito" a "En el carrito" con otro estilo.

## Estructura

```
public/data/productos.json
src/App.jsx
src/components/Navbar.jsx
src/components/Hero.jsx
src/components/Catalogo.jsx
src/components/ProductoCard.jsx
src/components/Carrito.jsx
```
