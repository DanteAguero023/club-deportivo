# Club Deportivo Puerto Aysén — SPA

Trabajo individual de evaluación — Front End (TI3V31), INACAP.
Alumno: Dante Agüero — Tema 10: Club deportivo.

## Sobre el negocio

El Club Deportivo Puerto Aysén ofrece actividades deportivas a la comunidad
(natación, fútbol, yoga, entre otras). Esta SPA resuelve dos necesidades del
club:

1. Mostrar el catálogo de actividades disponibles, consumiendo una API
   propia (FastAPI) que entrega nombre, descripción, categoría, precio y
   disponibilidad de cada actividad.
2. Gestionar la inscripción de socios a esas actividades: crear, editar,
   listar y eliminar socios, guardando los datos en el navegador
   (LocalStorage) para que sobrevivan al recargar la página.

## Cómo correr el proyecto

Este frontend necesita la API FastAPI corriendo en paralelo (proyecto
hermano, no incluido en esta carpeta).

1. Levantar la API (desde la carpeta del proyecto de la API):
   ```
   uvicorn main:app --port 8000
   ```
   Debe quedar disponible en `http://127.0.0.1:8000`.

2. Levantar el frontend (desde esta carpeta):
   ```
   npm install
   npm run dev
   ```
   Por defecto queda en `http://localhost:5173` (o el siguiente puerto libre).

Si la API no está corriendo, las páginas de "Datos API" y "Gestión" igual
cargan, pero muestran un mensaje de error en vez del catálogo de
actividades.

## Uso de IA

Para este trabajo usé Claude (Claude.ai y Claude Code) como apoyo durante el
desarrollo: para estructurar el proyecto y las carpetas, generar el código
base de los componentes y páginas, y para que me explicara conceptos de
React que no tenía claros antes de escribir el código (por ejemplo, por qué
un `useEffect` necesita un array de dependencias específico, o por qué
conviene inicializar un estado con una función en vez de leer LocalStorage
directamente en el cuerpo del componente).

Lo que aprendí trabajando así:

- **`useEffect` y sus dependencias**: entendí la diferencia entre un efecto
  que corre una sola vez (`[]`, como el fetch a la API) y uno que debe
  correr cada vez que cierto dato cambia (`[socios]`, para guardar en
  LocalStorage). También aprendí que hacer `setState` directamente dentro
  de un `useEffect` en el primer render puede evitarse usando un
  `useState` con función inicial y una `key` en el componente hijo para
  reiniciar su estado, en vez de sincronizar props con estado a mano.
- **Persistencia con LocalStorage**: cómo guardar y leer un array como
  JSON, y por qué conviene leerlo una sola vez (con un inicializador
  perezoso) en vez de en cada render.
- **Manejo de estados de una petición fetch**: separar explícitamente
  "cargando", "error" y "datos" para que la interfaz siempre le muestre
  algo coherente al usuario, sin importar si la API está arriba o no.

## Dónde está cada requisito

| Requisito | Archivo |
|---|---|
| Rutas sin recarga (react-router-dom) | [src/App.jsx](src/App.jsx) |
| Navbar con NavLink y estado activo | [src/components/Navbar.jsx](src/components/Navbar.jsx) |
| Consumo de API con estados de carga/error | [src/pages/DatosApi.jsx](src/pages/DatosApi.jsx) |
| Componente con props (catálogo) | [src/components/ActividadCard.jsx](src/components/ActividadCard.jsx) |
| CRUD con LocalStorage | [src/pages/Gestion.jsx](src/pages/Gestion.jsx) |
| useEffect justificado (persistencia) | [src/pages/Gestion.jsx](src/pages/Gestion.jsx) (líneas del `useEffect` de `localStorage.setItem`) |
| Formulario validado, sin submit nativo | [src/components/FormularioSocio.jsx](src/components/FormularioSocio.jsx) |
| Listado con props y cruce de datos con la API | [src/components/ListaSocios.jsx](src/components/ListaSocios.jsx) |
| Eliminar con confirmación (`window.confirm`) | [src/pages/Gestion.jsx](src/pages/Gestion.jsx) (función `eliminarSocio`) |
| Paleta de colores y layout Flexbox/Grid | [src/index.css](src/index.css), [src/App.css](src/App.css) |
