import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path para GitHub Pages: https://DanteAguero023.github.io/club-deportivo/
  base: '/club-deportivo/',
})
