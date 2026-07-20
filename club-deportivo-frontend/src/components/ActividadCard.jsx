// Card que muestra una actividad recibida desde la API. Props simples, sin estado propio.
function ActividadCard({ nombre, descripcion, categoria, precio, disponible, imagen }) {
  const precioFormateado = precio.toLocaleString('es-CL')

  return (
    <article className="actividad-card">
      <img src={imagen} alt={nombre} className="actividad-card-imagen" />
      <div className="actividad-card-contenido">
        <div className="actividad-card-encabezado">
          <h3>{nombre}</h3>
          <span className={`badge ${disponible ? 'badge-disponible' : 'badge-agotado'}`}>
            {disponible ? 'Disponible' : 'Sin cupo'}
          </span>
        </div>
        <p className="actividad-card-categoria">{categoria}</p>
        <p>{descripcion}</p>
        <p className="actividad-card-precio">${precioFormateado} CLP</p>
      </div>
    </article>
  )
}

export default ActividadCard
