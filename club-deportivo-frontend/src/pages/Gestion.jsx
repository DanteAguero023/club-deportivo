import { useEffect, useState } from 'react'
import FormularioSocio from '../components/FormularioSocio.jsx'
import ListaSocios from '../components/ListaSocios.jsx'

const API_URL = 'http://127.0.0.1:8000/api/actividades'
const CLAVE_LOCALSTORAGE = 'socios'

// Lazy initializer: la función solo se ejecuta en el primer render, así
// LocalStorage se lee una única vez y no en cada re-render del componente.
function leerSociosGuardados() {
  const guardado = localStorage.getItem(CLAVE_LOCALSTORAGE)
  return guardado ? JSON.parse(guardado) : []
}

function Gestion() {
  const [socios, setSocios] = useState(leerSociosGuardados)
  const [socioEditando, setSocioEditando] = useState(null)

  const [actividades, setActividades] = useState([])
  const [cargandoActividades, setCargandoActividades] = useState(true)
  const [errorActividades, setErrorActividades] = useState(null)

  useEffect(() => {
    document.title = 'Gestión | Club Deportivo Puerto Aysén'
  }, [])

  // Este es el useEffect que persiste los datos: cada vez que "socios" cambia
  // (crear, editar o eliminar) lo volvemos a guardar en LocalStorage. Por eso
  // depende de [socios] y no de un array vacío.
  useEffect(() => {
    localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(socios))
  }, [socios])

  // Se piden las actividades solo una vez al montar, para llenar el selector del formulario.
  useEffect(() => {
    fetch(API_URL)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status} al consultar la API`)
        }
        return respuesta.json()
      })
      .then((datos) => setActividades(datos.actividades))
      .catch((err) => setErrorActividades(err.message))
      .finally(() => setCargandoActividades(false))
  }, [])

  function guardarSocio(datosFormulario) {
    if (socioEditando) {
      setSocios((prev) =>
        prev.map((socio) =>
          socio.id === socioEditando.id ? { ...socio, ...datosFormulario } : socio,
        ),
      )
      setSocioEditando(null)
    } else {
      const nuevoSocio = {
        id: crypto.randomUUID(),
        ...datosFormulario,
        fechaInscripcion: new Date().toLocaleDateString('es-CL'),
      }
      setSocios((prev) => [...prev, nuevoSocio])
    }
  }

  function eliminarSocio(id) {
    const confirmado = window.confirm('¿Seguro que quieres eliminar este socio?')
    if (!confirmado) return

    setSocios((prev) => prev.filter((socio) => socio.id !== id))
    if (socioEditando && socioEditando.id === id) {
      setSocioEditando(null)
    }
  }

  return (
    <section>
      <h1>Gestión de socios</h1>

      {cargandoActividades && <p>Cargando actividades disponibles...</p>}
      {errorActividades && (
        <p className="mensaje-error" role="alert">
          No se pudo conectar con la API: {errorActividades}. Verifica que el
          servidor FastAPI esté corriendo en {API_URL}.
        </p>
      )}

      {!cargandoActividades && !errorActividades && (
        <div className="gestion-contenido">
          <FormularioSocio
            key={socioEditando ? socioEditando.id : 'nuevo'}
            actividades={actividades}
            onGuardar={guardarSocio}
            socioEditando={socioEditando}
            onCancelar={() => setSocioEditando(null)}
          />

          <div>
            <h2>Socios inscritos</h2>
            <ListaSocios
              socios={socios}
              actividades={actividades}
              onEditar={setSocioEditando}
              onEliminar={eliminarSocio}
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Gestion
