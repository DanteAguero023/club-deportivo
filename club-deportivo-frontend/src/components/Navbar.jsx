import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

// NavLink agrega la clase "active" automáticamente en el link de la ruta actual,
// por eso no necesitamos manejar el estado de la ruta activa a mano.
function Navbar({ tema, onCambiarTema }) {
  const [abierto, setAbierto] = useState(false)

  function cerrarDrawer() {
    setAbierto(false)
  }

  // Mientras el drawer está abierto, permitimos cerrarlo con la tecla Escape.
  // Se suscribe solo cuando hace falta y se limpia al cerrar o desmontar.
  useEffect(() => {
    if (!abierto) return

    function manejarTecla(evento) {
      if (evento.key === 'Escape') cerrarDrawer()
    }

    document.addEventListener('keydown', manejarTecla)
    return () => document.removeEventListener('keydown', manejarTecla)
  }, [abierto])

  return (
    <header className="navbar">
      <nav>
        <span className="navbar-titulo">Club Deportivo Puerto Aysén</span>
        <div className="navbar-acciones">
          <button
            type="button"
            className="boton-tema"
            onClick={onCambiarTema}
            aria-label={tema === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {tema === 'oscuro' ? '☀️' : '🌙'}
          </button>
          <button
            type="button"
            className="boton-hamburguesa"
            onClick={() => setAbierto(true)}
            aria-label="Abrir menú de navegación"
            aria-expanded={abierto}
            aria-controls="menu-drawer"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div
        className={`drawer-overlay ${abierto ? 'drawer-overlay-visible' : ''}`}
        onClick={cerrarDrawer}
        aria-hidden={!abierto}
      >
        <div
          id="menu-drawer"
          className="drawer"
          onClick={(evento) => evento.stopPropagation()}
        >
          <button
            type="button"
            className="drawer-cerrar"
            onClick={cerrarDrawer}
            aria-label="Cerrar menú de navegación"
          >
            ×
          </button>
          <ul className="drawer-links">
            <li>
              <NavLink to="/" end onClick={cerrarDrawer}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/gestion" onClick={cerrarDrawer}>
                Gestión
              </NavLink>
            </li>
            <li>
              <NavLink to="/datos-api" onClick={cerrarDrawer}>
                Datos API
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Navbar
