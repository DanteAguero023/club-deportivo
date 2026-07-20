// Muestra la tabla de socios inscritos. No maneja estado propio: recibe todo por props
// y delega las acciones (editar/eliminar) al padre.
function ListaSocios({ socios, actividades, onEditar, onEliminar }) {
  function nombreActividad(actividadId) {
    const actividad = actividades.find((a) => a.id === actividadId)
    return actividad ? actividad.nombre : 'Actividad no disponible'
  }

  if (socios.length === 0) {
    return <p>Todavía no hay socios inscritos.</p>
  }

  return (
    <table className="tabla-socios">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>RUT</th>
          <th>Email</th>
          <th>Actividad</th>
          <th>Fecha de inscripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {socios.map((socio) => (
          <tr key={socio.id}>
            <td>{socio.nombre}</td>
            <td>{socio.rut}</td>
            <td>{socio.email}</td>
            <td>{nombreActividad(socio.actividadId)}</td>
            <td>{socio.fechaInscripcion}</td>
            <td className="acciones-tabla">
              <button className="boton boton-burdeo" onClick={() => onEditar(socio)}>
                Editar
              </button>
              <button className="boton boton-secundario" onClick={() => onEliminar(socio.id)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ListaSocios
