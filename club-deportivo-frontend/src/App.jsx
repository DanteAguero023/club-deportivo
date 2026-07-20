import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import SplashScreen from './components/SplashScreen.jsx'
import Inicio from './pages/Inicio.jsx'
import Gestion from './pages/Gestion.jsx'
import Actividades from './pages/Actividades.jsx'
import { alternarModoDemo, esModoDemo } from './servicios/api.js'
import './App.css'

// Lazy initializer: si el usuario ya eligió un tema antes, lo respetamos;
// si no, partimos del tema que prefiere su sistema operativo/navegador.
function leerTemaInicial() {
  const guardado = localStorage.getItem('tema')
  if (guardado) return guardado
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro'
}

function App() {
  const [tema, setTema] = useState(leerTemaInicial)
  // sessionStorage (no LocalStorage): el splash debe reaparecer en una
  // pestaña/visita nueva, pero no cada vez que el usuario recarga (F5).
  const [mostrarSplash, setMostrarSplash] = useState(() => !sessionStorage.getItem('splashVisto'))

  // Aplica el tema al <html> (para que lo lean las variables CSS) y lo
  // guarda cada vez que cambia, para recordarlo en la próxima visita.
  useEffect(() => {
    document.documentElement.setAttribute('data-tema', tema)
    localStorage.setItem('tema', tema)
  }, [tema])

  // Oculta el splash tras un momento breve y recuerda que ya se mostró
  // en esta sesión. El cleanup cancela el timer si el componente se
  // desmonta antes de que termine (evita un setState "huérfano").
  useEffect(() => {
    if (!mostrarSplash) return
    const temporizador = setTimeout(() => {
      setMostrarSplash(false)
      sessionStorage.setItem('splashVisto', '1')
    }, 1800)
    return () => clearTimeout(temporizador)
  }, [mostrarSplash])

  function alternarTema() {
    setTema((actual) => (actual === 'oscuro' ? 'claro' : 'oscuro'))
  }

  // Atajo para presentaciones sin la API real (ej. el sitio subido a un
  // hosting estático): Ctrl+Shift+D prende/apaga el modo demo y recarga la
  // página, para que Actividades y Gestión vuelvan a pedir los datos ya con
  // el modo nuevo. Se suscribe una sola vez y se limpia al desmontar.
  useEffect(() => {
    function manejarAtajo(evento) {
      if (evento.ctrlKey && evento.shiftKey && evento.key.toLowerCase() === 'd') {
        evento.preventDefault()
        alternarModoDemo()
        window.location.reload()
      }
    }

    window.addEventListener('keydown', manejarAtajo)
    return () => window.removeEventListener('keydown', manejarAtajo)
  }, [])

  if (mostrarSplash) {
    return <SplashScreen />
  }

  return (
    <BrowserRouter>
      {/* Permite saltar el menú con teclado/lector de pantalla e ir directo al contenido. */}
      <a href="#contenido" className="skip-link">
        Saltar al contenido principal
      </a>
      <Navbar tema={tema} onCambiarTema={alternarTema} />
      {/* tabIndex=-1: no entra en el orden normal de Tab, pero permite que el
          skip-link anterior mueva el foco del teclado hasta aquí al activarse. */}
      <main id="contenido" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/gestion" element={<Gestion />} />
          <Route path="/actividades" element={<Actividades />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>Club Deportivo Puerto Aysén — Trabajo académico, INACAP TI3V31</p>
      </footer>
      {esModoDemo() && <div className="badge-modo-demo">MODO DEMO</div>}
    </BrowserRouter>
  )
}

export default App
