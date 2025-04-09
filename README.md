Liga Planetaria de SuperHeroes
Descripción
Esta aplicación fue desarrollada utilizando React + Vite + TailwindCSS y cumple con un CRUD completo sobre una colección de superhéroes. Implementa:

Rutas dinámicas y estáticas: Gracias a React Router DOM.
Estado global: Utilizando Context API.
Peticiones HTTP: Realizadas mediante la API Fetch.
Formularios controlados y validados: Permitiendo la creación y edición de registros.
Feedback visual: Con notificaciones (React Toastify) y confirmaciones (SweetAlert2) para operaciones críticas.
Carga Masiva: Para cargar superhéroes desde una fuente externa.
La aplicación permite gestionar superhéroes: crear, ver, editar y eliminar registros, además de implementar una paginación que facilita la visualización del listado.

Funcionalidades
Rutas Principales:

/ → Página principal o de bienvenida.
/items → Listado de personajes con paginación.
/items/create → Formulario para crear un nuevo superhéroe.
/items/:id → Detalle de un superhéroe.
/items/:id/edit → Formulario para editar un superhéroe existente.
* → Página 404 o redirección.
Operaciones CRUD:

Crear: Permite agregar nuevos registros con validación en el formulario.
Leer: Muestra el listado con paginación y detalle de cada registro.
Actualizar: Permite editar registros (incluyendo edición de poderes a través de powerstats).
Eliminar: Realiza la eliminación con confirmación visual mediante SweetAlert2.
Carga Masiva:
Utiliza una fuente externa para cargar un conjunto de superhéroes de forma masiva.

Estructura del Proyecto
/src ├── components // Componentes reutilizables (Header, Footer, Loader, etc.) ├── context // Implementación de Context API para el estado global ├── pages // Páginas de la aplicación (Home, ItemList, ItemDetail, ItemEdit, ItemCreate, NotFound, BulkUploader) ├── router // Configuración de rutas (AppRouter.jsx) ├── App.jsx // Componente principal de la aplicación └── main.jsx // Punto de entrada de la aplicación

Tecnologías Utilizadas
React: Para la construcción de la interfaz de usuario.
Vite: Como herramienta de desarrollo y bundler.
TailwindCSS: Para estilos rápidos y responsivos.
React Router DOM: Para la navegación entre vistas.
Context API: Para el manejo global del estado.
Fetch API: Para realizar peticiones HTTP a la API.
SweetAlert2: Para mostrar confirmaciones visuales en eliminación.
React Toastify: Para notificaciones en operaciones CRUD.
API Utilizada La aplicación consume la API de MockAPI:

https://67f1add4c733555e24add1ac.mockapi.io/api/v1/items

Esta API permite realizar operaciones CRUD para gestionar los superhéroes.

Autor Walter Guillermo Gerhardt

Link de la Pagina: https://ligaplanetaria.netlify.app/