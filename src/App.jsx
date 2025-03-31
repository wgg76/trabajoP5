// src/App.jsx
import React, { useState, useEffect, useContext } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { FavoritesContext } from "./Context/FavoritesContext";
import { useFetchCharacters } from "./Hooks/useFetchCharacters";
import CharacterList from "./components/CharacterList";
import Loader from "./components/Loader";
import FavoritesModal from "./components/FavoritesModal";
import VideoModal from "./components/VideoModal";
import { fetchCharactersByName } from "./Utils/api";
import background from "./assets/fondo.webp";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

function App() {
  const [inputLimit, setInputLimit] = useState("30");
  const [limit, setLimit] = useState(30);
  const [inputName, setInputName] = useState("");
  const [characters, setCharacters] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState(null);

  const { characters: fetchedCharacters, loading, error } = useFetchCharacters(limit);
  const { favorites } = useContext(FavoritesContext);

  useEffect(() => {
    if (inputName === "") {
      setCharacters(fetchedCharacters);
    }
  }, [fetchedCharacters, inputName]);

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

  const handleSubmitQuantity = (e) => {
    e.preventDefault();
    const newLimit = parseInt(inputLimit) || 0;
    setLimit(newLimit);
    setInputName("");
  };

  const handleSubmitName = async (e) => {
    e.preventDefault();
    console.log('Buscando personaje:', inputName);
    try {
      const data = await fetchCharactersByName(inputName);
      console.log('Resultado de búsqueda:', data);
      const limitedData = data.slice(0, limit);
      setCharacters(limitedData);
      toast.success("Datos obtenidos correctamente");
    } catch (err) {
      console.error("Error en la búsqueda por nombre:", err);
      toast.error("Error al obtener personajes por nombre");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center transition-all duration-300 bg-gray-900 text-white"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Header />

      <div className="container mx-auto p-4 mt-4 bg-gray-800/40 backdrop-blur-md rounded">
        <h1 className="text-3xl font-bold mb-4">Buscador de Personajes</h1>

        {/* Layout en dos columnas: Izquierda con formularios, Derecha con botones de capítulos */}
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Columna Izquierda: Formularios y botón de favoritos */}
          <div className="md:w-1/2 md:pr-4">
            <form onSubmit={handleSubmitQuantity} className="mb-4">
              <label className="block mb-2">Cantidad de personajes a mostrar:</label>
              <div className="flex items-center space-x-2 text-black">
                <input
                  type="number"
                  value={inputLimit}
                  onChange={(e) => setInputLimit(e.target.value)}
                  className="p-1 border rounded w-16"
                  min="0"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Actualizar
                </button>
              </div>
            </form>

            <form onSubmit={handleSubmitName} className="mb-4">
              <label className="block mb-2">Buscar por nombre:</label>
              <div className="flex items-center space-x-2 text-black">
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="p-1 border rounded"
                  placeholder="Nombre del personaje"
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                  Buscar
                </button>
              </div>
            </form>

            <div className="mb-4">
              <button
                onClick={() => setShowFavorites(true)}
                className={`${favorites.length > 0 ? "bg-green-500" : "bg-yellow-500"} text-white px-4 py-2 rounded`}
              >
                Ver Favoritos
              </button>
            </div>
          </div>

          {/* Columna Derecha: Botones para reproducir capítulos */}
          <div className="md:w-1/2 flex flex-col items-center justify-center mt-4 md:mt-0">
            <h2 className="text-2xl font-bold mb-4">Capítulos</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setActiveVideoId("BbAWyGjqgo4")}
                className="bg-purple-500 text-white px-4 py-2 rounded"
              >
                Capítulo 1
              </button>
              <button
                onClick={() => setActiveVideoId("FCgBK4FUprs")} 
                className="bg-purple-500 text-white px-4 py-2 rounded"
              >
                Capítulo 2
              </button>
              <button
                onClick={() => setActiveVideoId("D8M9qEbgyNk")} 
                className="bg-purple-500 text-white px-4 py-2 rounded"
              >
                Capítulo 3
              </button>
            </div>
          </div>
        </div>

        {loading ? <Loader /> : <CharacterList characters={characters} />}
        {showFavorites && <FavoritesModal onClose={() => setShowFavorites(false)} />}
      </div>      

      <Footer />

      <ToastContainer position="bottom-center" autoClose={3000} />


      {/* Modal de video, que se abre cuando activeVideoId no es null */}
      {activeVideoId && (
        <VideoModal videoId={activeVideoId} onClose={() => setActiveVideoId(null)} />
      )}
    </div>
  );
}

export default App;
