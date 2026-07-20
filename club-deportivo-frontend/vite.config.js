import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Rutas relativas para los assets del build: así funciona sin importar
  // en qué carpeta/dominio del hosting se suba (no depende de estar en la raíz).
  base: './',
})
