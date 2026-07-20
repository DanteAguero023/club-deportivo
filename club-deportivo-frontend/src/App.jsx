import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Inicio from './pages/Inicio.jsx'
import Gestion from './pages/Gestion.jsx'
import DatosApi from './pages/DatosApi.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
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
