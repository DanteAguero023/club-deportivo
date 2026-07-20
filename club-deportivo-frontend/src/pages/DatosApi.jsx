import { useEffect, useState } from 'react'
import ActividadCard from '../components/ActividadCard.jsx'

const API_URL = 'http://127.0.0.1:8000/api/actividades'

function DatosApi() {
  const [actividades, setActividades] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Datos API | Club Deportivo Puerto Aysén'
  }, [])

  // Array de dependencias vacío: solo queremos pedir los datos una vez,
  // al montar la página (no en cada render).
  useEffect(() => {
    fetch(API_URL)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status} al consultar la API`)
        }
        return respuesta.json()
      })
      .then((datos) => setActividades(datos.actividades))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false))
  }, [])

  return (
    <section>
      <h1>Actividades del club</h1>

      {cargando && <p>Cargando actividades...</p>}

      {error && (
        <p className="mensaje-error">
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

export default DatosApi
