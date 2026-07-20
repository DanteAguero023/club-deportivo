import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
      <h1>Club Deportivo Puerto Aysén</h1>
      <p className="hero-descripcion">
        Somos un club deportivo de Puerto Aysén con actividades para toda la
        comunidad: natación, fútbol, yoga y más. Esta aplicación permite
        revisar las actividades disponibles y gestionar la inscripción de
        socios de forma simple.
      </p>

      <p className="hero-contador">
        Socios inscritos actualmente: <strong>{totalSocios}</strong>
      </p>

      <div className="hero-acciones">
        <Link to="/gestion" className="boton boton-burdeo">
          Ir a Gestión de socios
        </Link>
        <Link to="/datos-api" className="boton boton-hunter">
          Ver actividades
        </Link>
      </div>
    </section>
  )
}

export default Inicio
