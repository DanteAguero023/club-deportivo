import { useEffect, useState } from 'react'
import ActividadCard from '../components/ActividadCard.jsx'
import { API_URL, obtenerActividades } from '../servicios/api.js'

function Actividades() {
  const [actividades, setActividades] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Actividades | Club Deportivo Puerto Aysén'
  }, [])

  // Array de dependencias vacío: solo queremos pedir los datos una vez,
  // al montar la página (no en cada render).
  useEffect(() => {
    obtenerActividades()
      .then((datos) => setActividades(datos.actividades))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false))
  }, [])

  return (
    <section>
      <h1>Actividades del club</h1>

      {cargando && <p>Cargando actividades...</p>}

      {error && (
        <p className="mensaje-error" role="alert">
          No se pudo conectar con la API: {error}. Verifica que el servidor
          FastAPI esté corriendo en {API_URL}.
        </p>
      )}

      {!cargando && !error && (
        <div className="actividades-grid">
          {actividades.map((actividad) => (
            <ActividadCard key={actividad.id} {...actividad} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Actividades
