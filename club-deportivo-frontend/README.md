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

## Tema oscuro y accesibilidad

- **Tema claro/oscuro**: botón 🌙/☀️ en la barra superior. Se guarda en
  LocalStorage y, la primera vez, respeta el tema del sistema operativo
  (`prefers-color-scheme`). Los colores de marca (burdeo y hunter) se
  mantienen en ambos temas para fondos sólidos (navbar, botones, badges);
  para texto sobre el fondo general se usan variantes pastel de esos
  mismos colores en modo oscuro, así se conserva el contraste.
- **Menú**: la navegación vive en un drawer lateral, abierto con el botón
  hamburguesa. Se cierra al elegir una sección, al hacer click fuera o con
  la tecla Escape.
- **Splash screen**: se muestra ~1.8 s solo en la primera visita de la
  sesión del navegador (se recuerda con `sessionStorage`, no reaparece si
  recargas con F5).
- **Accesibilidad**: enlace "Saltar al contenido principal" (visible al
  navegar con Tab), foco visible en todo elemento interactivo, atributos
  `aria-invalid`/`aria-describedby` en los campos del formulario con error,
  `aria-label` en los botones de la tabla de socios, y soporte de
  `prefers-reduced-motion` para quienes desactivan animaciones en su
  sistema.

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
- **Accesibilidad de teclado**: un skip-link que apunta a `#contenido` no
  mueve el foco si ese elemento no es enfocable por defecto; hay que
  agregarle `tabIndex={-1}` para que el salto realmente funcione con
  teclado, no solo visualmente.

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
| Tema claro/oscuro | [src/index.css](src/index.css) (variables), [src/App.jsx](src/App.jsx) (estado y persistencia) |
| Menú drawer con botón hamburguesa | [src/components/Navbar.jsx](src/components/Navbar.jsx) |
| Splash screen (primera visita) | [src/components/SplashScreen.jsx](src/components/SplashScreen.jsx), [src/App.jsx](src/App.jsx) |
| Accesibilidad (skip link, focus, aria, reduced motion) | [src/index.css](src/index.css), [src/App.jsx](src/App.jsx), [src/components/FormularioSocio.jsx](src/components/FormularioSocio.jsx), [src/components/ListaSocios.jsx](src/components/ListaSocios.jsx) |
