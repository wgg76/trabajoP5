import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

 
  const isHome = path === "/";
  const isList = path === "/items";
  const isCreate = path === "/items/create";
  const isEdit = path.includes("/edit");
  
  const isDetail = path.startsWith("/items/") && !isList && !isCreate && !isEdit;

  return (
    <header className="bg-yellow-600/10 backdrop-blur-md text-white p-7 flex flex-col items-center space-y-4 shadow-md">
      <div className="flex items-center justify-center space-x-5">
        <h1 className="text-5xl font-bold text-center">Liga Planetaria de SuperHeroes</h1>
      </div>

   
      {!isHome && (
        <div className="flex space-x-4 mb-5">
         
          <Link
            to="/"
            className="bg-white text-yellow-600 font-semibold px-4 py-2 rounded hover:bg-yellow-100 transition"
          >
            🏠 Inicio
          </Link>

          
          {isList && (
            <Link
              to="/items/create"
              className="bg-white text-yellow-600 font-semibold px-4 py-2 rounded hover:bg-yellow-100 transition"
            >
              + Agregar personaje
            </Link>
          )}

          
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
