// Pantalla de bienvenida que App.jsx muestra solo en la primera visita
// de la sesión del navegador (ver App.jsx). role="status" avisa a los
// lectores de pantalla que hay contenido cargando, sin interrumpirlos.
function SplashScreen() {
  return (
    <div className="splash" role="status" aria-live="polite">
      <div className="splash-contenido">
        <h1>Club Deportivo Puerto Aysén</h1>
        <p>Bienvenido</p>
      </div>
    </div>
  )
}

export default SplashScreen
