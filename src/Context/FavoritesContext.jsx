// src/Context/FavoritesContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Inicializamos el estado leyendo de localStorage una sola vez
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Error leyendo favoritos de localStorage:", error);
      return [];
    }
  });

  // Cada vez que cambien los favoritos, actualizamos localStorage
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error("Error guardando favoritos en localStorage:", error);
    }
  }, [favorites]);

  const addFavorite = (character) => {
    setFavorites((prevFavorites) => {
      // Evitamos duplicados
      if (!prevFavorites.some((fav) => fav.id === character.id)) {
        return [...prevFavorites, character];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((character) => character.id !== id)
    );
  };

  // Para borrar todos, si lo necesitás:
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
