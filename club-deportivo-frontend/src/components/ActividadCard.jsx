// La API entrega su propio campo "imagen" (un placeholder gris con el nombre
// en texto), así que en vez de usarlo mostramos una foto real de stock según
// la actividad, buscada por palabra clave en LoremFlickr. "lock" fija siempre
// la misma foto (elegida a mano) en vez de una aleatoria distinta en cada
// carga, que a veces no tenía nada que ver con el deporte buscado. Si el
// nombre no está en el mapa (por ejemplo, una actividad nueva en la API), se
// usa la categoría como palabra de búsqueda, sin foto fija.
const IMAGEN_POR_ACTIVIDAD = {
  Fútbol: 'soccer?lock=4',
  Básquetbol: 'basketball,court?lock=2',
  Vóleibol: 'volleyball?lock=1',
  Natación: 'swimmer?lock=3',
  Tenis: 'tennis?lock=2',
}

function obtenerImagenActividad(nombre, categoria) {
  const busqueda = IMAGEN_POR_ACTIVIDAD[nombre] ?? encodeURIComponent(categoria ?? 'sport')
  return `https://loremflickr.com/400/300/${busqueda}`
}

// Card que muestra una actividad recibida desde la API. Props simples, sin estado propio.
function ActividadCard({ nombre, descripcion, categoria, precio, disponible }) {
  const precioFormateado = precio.toLocaleString('es-CL')

  return (
    <article className="actividad-card">
      <img
        src={obtenerImagenActividad(nombre, categoria)}
        alt={nombre}
        className="actividad-card-imagen"
      />
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
