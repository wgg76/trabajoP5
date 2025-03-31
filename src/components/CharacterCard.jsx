// src/components/CharacterCard.jsx
import React, { useContext } from "react";
import { FavoritesContext } from "../Context/FavoritesContext";

const CharacterCard = ({ character, variant = "default" }) => {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some((fav) => fav.id === character.id);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  // Definir clases de estilo según la variante
  const containerClass =
    variant === "favorite"
      ? "w-62 border border-white/30 p-4 shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-white bg-white/10 backdrop-blur-sm rounded"
      : "w-66 border rounded p-4 shadow hover:shadow-lg transition duration-300 flex flex-col items-center text-black";

  const titleClass =
    variant === "favorite"
      ? "text-lg font-semibold text-center whitespace-normal break-words"
      : "text-lg font-semibold text-center truncate";

  return (
    <div className={containerClass}>
      <div className="w-3/4 aspect-square mb-4">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <h2 className={titleClass}>{character.name}</h2>
      <p className="text-center text-xs">Especie: {character.species}</p>
      <p className="text-center text-xs">Estado: {character.status}</p>
      <p className="text-center text-xs">Sexo: {character.gender}</p>
      {character.location && (
        <p className="text-center text-xs">
          Locación: {character.location.name}
        </p>
      )}
      <button
        onClick={handleFavorite}
        className={`mt-2 px-3 py-1 rounded text-xs ${
          isFavorite ? "bg-red-500 text-white" : "bg-green-500 text-white"
        }`}
      >
        {isFavorite ? "Quitar" : "Agregar"}
      </button>
    </div>
  );
};

export default CharacterCard;
