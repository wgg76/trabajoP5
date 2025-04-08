import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Usamos useLocation para obtener la ubicación actual

const Header = () => {
  const location = useLocation(); // Obtenemos la ubicación actual

  return (
    <header className="bg-yellow-600/10 backdrop-blur-md text-white p-7 flex flex-col items-center space-y-4 shadow-md">
      <div className="flex items-center justify-center space-x-5">
        <h1 className="text-5xl font-bold text-center">Liga Planetaria de SuperHeroes</h1>
      </div>

      <div className="flex space-x-4 mb-5">
        {/* En la página principal Home */}
        

        {/* En la página de personajes, mostrar "Inicio" y "Agregar personaje" */}
        {location.pathname === "/items" && (
          <>
            <Link
              to="/"
              className="bg-white text-yellow-600 font-semibold px-4 py-2 rounded hover:bg-yellow-100 transition"
            >
              🏠 Inicio
            </Link>

            <Link
              to="/items/create"
              className="bg-white text-yellow-600 font-semibold px-4 py-2 rounded hover:bg-yellow-100 transition"
            >
              + Agregar personaje
            </Link>
          </>
        )}

        {/* En la página de edición, mostrar "Personajes" e "Inicio" */}
        {location.pathname.includes("/items/") && location.pathname.includes("/edit") && (
          <>
            <Link
              to="/items"
              className="bg-white text-yellow-600 font-semibold px-4 py-2 rounded hover:bg-yellow-100 transition"
            >
              🦸‍♂️ Personajes
            </Link>
            <Link
              to="/"
              className="bg-white text-yellow-600 font-semibold px-4 py-2 rounded hover:bg-yellow-100 transition"
            >
              🏠 Inicio
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
