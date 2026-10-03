import { SLIDES } from "../data/slides";

export default function Hero({ indice, onCambiarIndice, onVerCategoria }) {
  const slide = SLIDES[indice];

  return (
    <section id="inicio" className="hero" aria-label="Promociones destacadas">
      <img src={slide.imagen} alt={slide.titulo} />
      <div className="hero-copy">
        <span>{slide.etiqueta}</span>
        <h1>{slide.titulo}</h1>
        <p>{slide.texto}</p>
        <button type="button" onClick={() => onVerCategoria(slide.categoria)}>
          Ver catálogo
        </button>
      </div>
      <div className="hero-dots" role="tablist" aria-label="Diapositivas">
        {SLIDES.map((item, i) => (
          <button
            key={item.titulo}
            type="button"
            className={i === indice ? "activo" : ""}
            aria-label={item.etiqueta}
            onClick={() => onCambiarIndice(i)}
          />
        ))}
      </div>
    </section>
  );
}
