import { useState } from 'react'

// Regex simples y explicables: RUT sin puntos (ej: 12345678-9) y un email básico.
const RUT_REGEX = /^\d{7,8}-[\dkK]$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const valoresIniciales = { nombre: '', rut: '', email: '', actividadId: '' }

// Formulario controlado: recibe las actividades para el selector y avisa al
// padre (Gestion.jsx) cuando el socio se guarda, vía onGuardar.
//
// El padre le pasa una prop "key" distinta cada vez que cambia el socio a
// editar (o al pasar a "nuevo"); eso hace que React desmonte y vuelva a
// montar este componente, reiniciando su estado con el useState de abajo.
// Así evitamos usar un useEffect solo para sincronizar props con estado.
function FormularioSocio({ actividades, onGuardar, socioEditando, onCancelar }) {
  const [valores, setValores] = useState(
    socioEditando
      ? {
          nombre: socioEditando.nombre,
          rut: socioEditando.rut,
          email: socioEditando.email,
          actividadId: String(socioEditando.actividadId),
        }
      : valoresIniciales,
  )
  const [errores, setErrores] = useState({})

  function validar() {
    const nuevosErrores = {}
    if (valores.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres.'
    }
    if (!RUT_REGEX.test(valores.rut.trim())) {
      nuevosErrores.rut = 'RUT inválido. Formato esperado: 12345678-9.'
    }
    if (!EMAIL_REGEX.test(valores.email.trim())) {
      nuevosErrores.email = 'Correo electrónico inválido.'
    }
    if (!valores.actividadId) {
      nuevosErrores.actividadId = 'Selecciona una actividad.'
    }
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setValores((prev) => ({ ...prev, [name]: value }))
  }

  function manejarEnvio(evento) {
    evento.preventDefault() // evita que el navegador recargue la página al enviar el form
    if (!validar()) return

    onGuardar({ ...valores, nombre: valores.nombre.trim(), actividadId: Number(valores.actividadId) })
    setValores(valoresIniciales)
    setErrores({})
  }

  return (
    <form className="formulario-socio" onSubmit={manejarEnvio} noValidate>
      <div className="campo">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          value={valores.nombre}
          onChange={manejarCambio}
          aria-invalid={Boolean(errores.nombre)}
          aria-describedby={errores.nombre ? 'nombre-error' : undefined}
        />
        {errores.nombre && (
          <p id="nombre-error" className="error-campo">
            {errores.nombre}
          </p>
        )}
      </div>

      <div className="campo">
        <label htmlFor="rut">RUT</label>
        <input
          id="rut"
          name="rut"
          value={valores.rut}
          onChange={manejarCambio}
          placeholder="12345678-9"
          aria-invalid={Boolean(errores.rut)}
          aria-describedby={errores.rut ? 'rut-error' : undefined}
        />
        {errores.rut && (
          <p id="rut-error" className="error-campo">
            {errores.rut}
          </p>
        )}
      </div>

      <div className="campo">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={valores.email}
          onChange={manejarCambio}
          aria-invalid={Boolean(errores.email)}
          aria-describedby={errores.email ? 'email-error' : undefined}
        />
        {errores.email && (
          <p id="email-error" className="error-campo">
            {errores.email}
          </p>
        )}
      </div>

      <div className="campo">
        <label htmlFor="actividadId">Actividad</label>
        <select
          id="actividadId"
          name="actividadId"
          value={valores.actividadId}
          onChange={manejarCambio}
          aria-invalid={Boolean(errores.actividadId)}
          aria-describedby={errores.actividadId ? 'actividad-error' : undefined}
        >
          <option value="">Selecciona una actividad</option>
          {actividades.map((actividad) => (
            <option key={actividad.id} value={actividad.id} disabled={!actividad.disponible}>
              {actividad.nombre} {!actividad.disponible ? '(sin cupo)' : ''}
            </option>
          ))}
        </select>
        {errores.actividadId && (
          <p id="actividad-error" className="error-campo">
            {errores.actividadId}
          </p>
        )}
      </div>

      <div className="acciones-formulario">
        <button type="submit" className="boton boton-hunter">
          {socioEditando ? 'Actualizar' : 'Guardar'}
        </button>
        {socioEditando && (
          <button type="button" className="boton boton-secundario" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default FormularioSocio
