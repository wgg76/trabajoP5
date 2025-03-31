Decidiendo Qué Usar y Cómo Hacerlo
Para Traer Datos de la API: Fetch y un Hook Hecho por Nosotros
Usamos "fetch": Decidimos usar "fetch" para hablar con la API de Rick and Morty porque ya viene incluido en casi todos los navegadores. 
¡Así nos ahorramos instalar cosas extras! Y como solo necesitamos hacer peticiones sencillas, nos viene perfecto.
Creamos nuestro propio "useFetchCharacters": Para que el código sea más ordenado y fácil de usar en otros lados, hicimos un "custom hook" llamado "useFetchCharacters". 
Este hook se encarga de todo el trabajo sucio de pedir los personajes a la API. ¡Así mantenemos las cosas separadas y podemos reutilizarlo!
Para el Formulario: Dos Partes Bien Diferenciadas
Control de la cantidad de personajes: Aquí usamos dos "estados": "inputLimit" y "limit". "inputLimit" guarda lo que el usuario escribe, 
y "limit" solo se actualiza cuando el usuario le da a "Actualizar". ¡Así evitamos molestar a la API a cada rato!
Búsqueda por nombre: Hicimos otro formulario con un campo de texto para buscar personajes por nombre. ¡Así la gente puede encontrar a su personaje favorito más fácil!
Para los Mensajes de Error y Avisos: react-toastify
Usamos "react-toastify": Elegimos "react-toastify" para mostrar mensajes de error y avisos porque es muy fácil de usar y se ve bien. 
¡Además, se integra perfecto con React!
En resumen, elegimos estas herramientas y formas de hacer las cosas para que el proyecto sea fácil de mantener, esté bien organizado y, 
sobre todo, para que los usuarios tengan una buena experiencia.