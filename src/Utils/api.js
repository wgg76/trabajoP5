// src/utils/api.js
export const fetchCharacters = async () => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character/");
    if (!response.ok) {
      throw new Error("Error al obtener personajes");
    }
    const data = await response.json();
    // Retornamos solo el array de personajes
    return data.results;
  } catch (error) {
    throw error;
  }
};

export const fetchCharactersByName = async (name) => {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
    if (!response.ok) {
      throw new Error("Error al obtener personajes por nombre");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw error;
  }
};
