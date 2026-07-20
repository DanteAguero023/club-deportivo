import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Inicio from './pages/Inicio.jsx'
import Gestion from './pages/Gestion.jsx'
import DatosApi from './pages/DatosApi.jsx'
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

  // Aplica el tema al <html> (para que lo lean las variables CSS) y lo
  // guarda cada vez que cambia, para recordarlo en la próxima visita.
  useEffect(() => {
    document.documentElement.setAttribute('data-tema', tema)
    localStorage.setItem('tema', tema)
  }, [tema])

  function alternarTema() {
    setTema((actual) => (actual === 'oscuro' ? 'claro' : 'oscuro'))
  }

  return (
    <BrowserRouter>
      <Navbar tema={tema} onCambiarTema={alternarTema} />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/gestion" element={<Gestion />} />
          <Route path="/datos-api" element={<DatosApi />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>Club Deportivo Puerto Aysén — Trabajo académico, INACAP TI3V31</p>
      </footer>
    </BrowserRouter>
  )
}

export default App
