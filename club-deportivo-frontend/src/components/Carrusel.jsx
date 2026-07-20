import { useEffect, useState } from 'react'

// Carrusel simple: recibe las imágenes por props y se encarga solo de
// mostrarlas una a la vez, rotando automáticamente.
function Carrusel({ imagenes }) {
  const [indiceActual, setIndiceActual] = useState(0)
  const [pausado, setPausado] = useState(false)

  // Avanza de imagen sola cada 5s. Se pausa mientras "pausado" es true
  // (mouse/foco encima) y no arranca si el usuario prefiere menos
  // movimiento en su sistema operativo. Se limpia el intervalo al
  // cambiar de estado o desmontar, para no dejarlo corriendo de fondo.
  useEffect(() => {
    const prefiereMenosMovimiento = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (pausado || prefiereMenosMovimiento) return

    const intervalo = setInterval(() => {
      setIndiceActual((indice) => (indice + 1) % imagenes.length)
    }, 5000)

    return () => clearInterval(intervalo)
  }, [pausado, imagenes.length])

  function irAAnterior() {
    setIndiceActual((indice) => (indice - 1 + imagenes.length) % imagenes.length)
  }

  function irASiguiente() {
    setIndiceActual((indice) => (indice + 1) % imagenes.length)
  }

  const imagen = imagenes[indiceActual]

  return (
    <div
      className="carrusel"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <img key={indiceActual} src={imagen.src} alt={imagen.alt} className="carrusel-imagen" />

      <button
        type="button"
        className="carrusel-flecha carrusel-flecha-izquierda"
        onClick={irAAnterior}
        aria-label="Imagen anterior"
      >
        ‹
      </button>
      <button
        type="button"
        className="carrusel-flecha carrusel-flecha-derecha"
        onClick={irASiguiente}
        aria-label="Imagen siguiente"
      >
        ›
      </button>

      <div className="carrusel-puntos">
        {imagenes.map((img, indice) => (
          <button
            key={img.src}
            type="button"
            className={`carrusel-punto ${indice === indiceActual ? 'carrusel-punto-activo' : ''}`}
            onClick={() => setIndiceActual(indice)}
            aria-label={`Ir a la imagen ${indice + 1}`}
            aria-current={indice === indiceActual}
          />
        ))}
      </div>
    </div>
  )
}

export default Carrusel
