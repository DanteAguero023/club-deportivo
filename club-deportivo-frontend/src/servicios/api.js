const API_URL = 'http://127.0.0.1:8000/api/actividades'
const CLAVE_MODO_DEMO = 'modoDemo'

// Copia exacta de los datos que entrega la API real (main.py), para que el
// modo demo se vea igual que la aplicación funcionando contra el backend.
// Sirve para presentar el proyecto en un hosting estático, donde la API
// (que corre en localhost) no está disponible.
const ACTIVIDADES_DEMO = [
  {
    id: 1,
    nombre: 'Fútbol',
    descripcion: 'Entrenamiento fútbol 11',
    categoria: 'Cancha',
    precio: 25000,
    disponible: true,
    imagen: 'https://placehold.co/400x300?text=Fútbol',
  },
  {
    id: 2,
    nombre: 'Básquetbol',
    descripcion: 'Categoría juvenil y adulta',
    categoria: 'Gimnasio',
    precio: 22000,
    disponible: true,
    imagen: 'https://placehold.co/400x300?text=Básquetbol',
  },
  {
    id: 3,
    nombre: 'Vóleibol',
    descripcion: 'Mixto, nivel intermedio',
    categoria: 'Gimnasio',
    precio: 20000,
    disponible: true,
    imagen: 'https://placehold.co/400x300?text=Vóleibol',
  },
  {
    id: 4,
    nombre: 'Natación',
    descripcion: 'Piscina temperada',
    categoria: 'Piscina',
    precio: 30000,
    disponible: true,
    imagen: 'https://placehold.co/400x300?text=Natación',
  },
  {
    id: 5,
    nombre: 'Tenis',
    descripcion: 'Canchas de arcilla',
    categoria: 'Cancha',
    precio: 28000,
    disponible: false,
    imagen: 'https://placehold.co/400x300?text=Tenis',
  },
]

export function esModoDemo() {
  return localStorage.getItem(CLAVE_MODO_DEMO) === '1'
}

export function alternarModoDemo() {
  localStorage.setItem(CLAVE_MODO_DEMO, esModoDemo() ? '0' : '1')
}

// Punto único desde el que las páginas piden las actividades: si el modo
// demo está activo, simula la respuesta de la API con un pequeño retraso
// (para que se alcance a ver el estado "Cargando..." en la presentación);
// si no, hace el fetch real, igual que antes.
export function obtenerActividades() {
  if (esModoDemo()) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ total: ACTIVIDADES_DEMO.length, actividades: ACTIVIDADES_DEMO })
      }, 600)
    })
  }

  return fetch(API_URL).then((respuesta) => {
    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al consultar la API`)
    }
    return respuesta.json()
  })
}

export { API_URL }
