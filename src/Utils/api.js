// src/utils/api.js
export const fetchCharacters = async () => {
  try {
    const response = await fetch("https://cdn.jsdelivr.net/gh/wgg76/superhero-api@main/superheroes.json");
    if (!response.ok) {
      throw new Error("Error al obtener personajes");
    }
    const data = await response.json();
    // Retornamos directamente el array de superhéroes
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchCharactersByName = async (name) => {
  try {
    const response = await fetch("https://cdn.jsdelivr.net/gh/wgg76/superhero-api@main/superheroes.json");
    if (!response.ok) {
      throw new Error("Error al obtener personajes");
    }
    const data = await response.json();
    // Filtramos los personajes cuyo nombre incluya el término buscado (ignora mayúsculas/minúsculas)
    return data.filter((character) =>
      character.name.toLowerCase().includes(name.toLowerCase())
    );
  } catch (error) {
    throw error;
  }
};
