import React, { useState } from "react";
import { Link } from "react-router-dom";

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCharacters = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://67f1add4c733555e24add1ac.mockapi.io/api/v1/items"
      );
      if (!response.ok) {
        throw new Error("Error al obtener los personajes");
      }
      const data = await response.json();
      setCharacters(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Superhéroes</h1>
      <button
        onClick={fetchCharacters}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-4"
      >
        Cargar personajes
      </button>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && characters.length === 0 && <p>No se encontraron personajes.</p>}
      <ul>
        {characters.map((hero) => (
          <li key={hero.id} className="mb-2">
            <Link to={`/item/${hero.id}`} className="text-blue-600 hover:underline">
              {hero.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharactersList;
