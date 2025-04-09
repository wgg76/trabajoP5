import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  // Definimos banderas según la ruta actual:
  const isHome = path === "/";
  const isList = path === "/items";
  const isCreate = path === "/items/create";
  const isEdit = path.includes("/edit");
  // Vista de detalle: ruta que empieza con "/items/" y no es listado, creación ni edición.
  const isDetail = path.startsWith("/items/") && !isList && !isCreate && !isEdit;

  return (
    <header className="bg-yellow-600/10 backdrop-blur-md text-white p-7 flex flex-col items-center space-y-4 shadow-md">
      <div className="flex items-center justify-center space-x-5">
        <h1 className="text-5xl font-bold text-center">Liga Planetaria de SuperHeroes</h1>
      </div>

      {/* Mostrar botones si no se está en la página principal */}
      {!isHome && (
        <div className="flex space-x-4 mb-5">
          {/* El botón Inicio siempre se muestra */}
          <Link
            to="/"
            className="bg-white text-yellow-600 font-semibold px-4 py-2 rounded hover:bg-yellow-100 transition"
          >
            🏠 Inicio
          </Link>

          {/* En listado, mostramos también "+ Agregar personaje" */}
          {isList && (
            <Link
              to="/items/create"
              className="bg-white text-yellow-600 font-semibold px-4 py-2 rounded hover:bg-yellow-100 transition"
            >
              + Agregar personaje
            </Link>
          )}

          {/* En detalle, mostramos el botón Personajes para volver al listado */}
          {isDetail && (
            <Link
              to="/items"
              className="bg-white text-yellow-600 font-semibold px-4 py-2 rounded hover:bg-yellow-100 transition"
            >
              🦸‍♂️ Personajes
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
