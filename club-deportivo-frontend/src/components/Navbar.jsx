import { NavLink } from 'react-router-dom'

// NavLink agrega la clase "active" automáticamente en el link de la ruta actual,
// por eso no necesitamos manejar el estado de la ruta activa a mano.
function Navbar() {
  return (
    <header className="navbar">
      <nav>
        <span className="navbar-titulo">Club Deportivo Puerto Aysén</span>
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
      </nav>
    </header>
  )
}

export default Navbar
