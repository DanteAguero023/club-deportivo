import { NavLink } from 'react-router-dom'

// NavLink agrega la clase "active" automáticamente en el link de la ruta actual,
// por eso no necesitamos manejar el estado de la ruta activa a mano.
function Navbar({ tema, onCambiarTema }) {
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
          <ul className="navbar-links">
            <li>
              <NavLink to="/" end>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/gestion">Gestión</NavLink>
            </li>
            <li>
              <NavLink to="/datos-api">Datos API</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
