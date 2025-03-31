// FavoritesModal.jsx
import React, { useContext } from 'react';
import { FavoritesContext } from '../Context/FavoritesContext';
import CharacterCard from './CharacterCard';
import fondo from '../assets/fondo.webp'; // Asegurate de la ruta

const FavoritesModal = ({ onClose }) => {
  const { favorites, clearFavorites } = useContext(FavoritesContext);

  const handleClearAll = () => {
    if (window.confirm("¿Seguro que desea eliminar todos los favoritos?")) {
      clearFavorites();
    }
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50">
      {/* Fondo semitransparente */}
      <div className="fixed inset-0 bg-black opacity-40" onClick={onClose}></div>
      
      {/* Contenedor con imagen de fondo */}
      <div
        className="relative bg-cover bg-center rounded-lg shadow-lg z-50 p-6 max-w-3xl w-full mt-10 pointer-events-auto"
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Contenido con mayor z-index */}
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-black">Mis Favoritos</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleClearAll}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Borrar todos
              </button>
              <button
                onClick={onClose}
                className="text-gray-200 text-3xl leading-none hover:text-gray-400"
              >
                &times;
              </button>
            </div>
          </div>
          {favorites.length === 0 ? (
            <p className="text-gray-700 text-2xl font-bold text-center">No tienes personajes favoritos.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              {favorites.map((fav) => (
                <CharacterCard key={fav.id} character={fav} variant="favorite" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;
