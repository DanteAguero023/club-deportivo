import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Carrusel from '../components/Carrusel.jsx'

const IMAGENES_CARRUSEL = [
  { src: 'https://loremflickr.com/1200/500/soccer,team', alt: 'Equipo jugando un partido de fútbol' },
  { src: 'https://loremflickr.com/1200/500/basketball,court', alt: 'Partido de básquetbol en una cancha techada' },
  { src: 'https://loremflickr.com/1200/500/swimmer', alt: 'Persona nadando en una piscina' },
]

function contarSociosGuardados() {
  const guardado = localStorage.getItem('socios')
  return guardado ? JSON.parse(guardado).length : 0
}

function Inicio() {
  const [totalSocios] = useState(contarSociosGuardados)

  // Cambia el título de la pestaña del navegador al entrar a esta página.
  useEffect(() => {
    document.title = 'Inicio | Club Deportivo Puerto Aysén'
  }, [])

  return (
    <section className="hero">
      <Carrusel imagenes={IMAGENES_CARRUSEL} />

      <h1>Club Deportivo Puerto Aysén</h1>
      <p className="hero-descripcion">
        Somos un club deportivo de Puerto Aysén con actividades para toda la
        comunidad: natación, fútbol, yoga y más. Esta aplicación permite
        revisar las actividades disponibles y gestionar la inscripción de
        socios de forma simple.
      </p>

      <div className="dashboard-grid">
        <div className="dashboard-tile">
          <span className="dashboard-tile-icono" aria-hidden="true">
            👥
          </span>
          <span className="dashboard-tile-numero">{totalSocios}</span>
          <span className="dashboard-tile-label">Socios inscritos</span>
        </div>

        <Link to="/gestion" className="dashboard-tile dashboard-tile-link">
          <span className="dashboard-tile-icono" aria-hidden="true">
            📋
          </span>
          <span className="dashboard-tile-titulo">Gestión de socios</span>
          <span className="dashboard-tile-descripcion">Inscribe, edita o da de baja a un socio</span>
        </Link>

        <Link to="/actividades" className="dashboard-tile dashboard-tile-link">
          <span className="dashboard-tile-icono" aria-hidden="true">
            🏅
          </span>
          <span className="dashboard-tile-titulo">Actividades</span>
          <span className="dashboard-tile-descripcion">Revisa el catálogo y la disponibilidad</span>
        </Link>
      </div>
    </section>
  )
}

export default Inicio
