import React, { useState } from "react";
import { Link } from "react-router-dom";
import background from "../assets/fondo.jpg"; // Ajusta la ruta si es necesario
import { toast } from "react-toastify"; // Asegúrate de importar el toast

const Home = () => {
  const [startIndex, setStartIndex] = useState(0); // Índice para saber desde qué personaje empezar a cargar
  const [loading, setLoading] = useState(false); // Estado de carga para mostrar cuando se está cargando

  const handleBulkUpload = async () => {
    const apiUrl = "https://67f1add4c733555e24add1ac.mockapi.io/api/v1/items";
    const sourceUrl =
      "https://cdn.jsdelivr.net/gh/wgg76/superhero-api@main/superheroes.json";

    setLoading(true); // Comienza la carga

    try {
      const response = await fetch(sourceUrl);
      const data = await response.json();

      // Calculamos los 20 personajes siguientes
      const nextHeroes = data.slice(startIndex, startIndex + 20); // Cargar los siguientes 20 personajes

      for (const hero of nextHeroes) {
        // Verificamos si biography es un objeto o un string.
        const biography =
          typeof hero.biography === "object"
            ? hero.biography
            : {
                fullName: hero.biography || "",
                alterEgos: "",
                aliases: [],
                placeOfBirth: "",
                firstAppearance: "",
                publisher: hero.publisher || "",
                alignment: "",
              };

        const newHero = {
          name: hero.name,
          slug: hero.slug,
          imageUrl: hero.images.sm,
          biography, // Enviamos el objeto completo
          // Agregamos los campos adicionales tal como vienen
          powerstats: hero.powerstats || {},
          appearance: hero.appearance || {},
          work: hero.work || {},
          connections: hero.connections || {},
          images: hero.images || {},
        };

        // Solicitud POST a la API
        const postResponse = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newHero),
        });

        if (!postResponse.ok) {
          console.error(`❌ Error cargando: ${hero.name}`);
        } else {
          console.log(`✅ Cargado: ${hero.name}`);
        }
      }

      // Actualizamos el índice para cargar los siguientes personajes la próxima vez
      setStartIndex(startIndex + 20);

      toast.success("Carga masiva finalizada ✅"); // Notificación de éxito
    } catch (error) {
      console.error("❌ Error al cargar personajes:", error);
      toast.error("Ocurrió un error al cargar los personajes"); // Notificación de error
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return (
    <div
      className="relative bg-black w-screen flex flex-col justify-center items-center text-center"
      style={{
        height: "calc(100vh - 150px)",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay opcional */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <h1 className="text-white text-9xl font-bold mb-6">BIENVENIDO</h1>

        {/* Contenedor de botones en fila */}
        <div className="flex flex-row gap-4 justify-center">
          <Link
            to="/items"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Ver personajes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
