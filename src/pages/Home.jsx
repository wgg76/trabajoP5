import React, { useState } from "react";
import { Link } from "react-router-dom";
import background from "../assets/fondo.jpg"; 
import { toast } from "react-toastify"; 

const Home = () => {
  const [startIndex, setStartIndex] = useState(0); 
  const [loading, setLoading] = useState(false); 

  const handleBulkUpload = async () => {
    const apiUrl = "https://67f1add4c733555e24add1ac.mockapi.io/api/v1/items";
    const sourceUrl =
      "https://cdn.jsdelivr.net/gh/wgg76/superhero-api@main/superheroes.json";

    setLoading(true); 

    try {
      const response = await fetch(sourceUrl);
      const data = await response.json();

      
      const nextHeroes = data.slice(startIndex, startIndex + 20); 

      for (const hero of nextHeroes) {
        
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
          biography, 
          
          powerstats: hero.powerstats || {},
          appearance: hero.appearance || {},
          work: hero.work || {},
          connections: hero.connections || {},
          images: hero.images || {},
        };

        
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

      
      setStartIndex(startIndex + 20);

      toast.success("Carga masiva finalizada ✅"); 
    } catch (error) {
      console.error("❌ Error al cargar personajes:", error);
      toast.error("Ocurrió un error al cargar los personajes"); 
    } finally {
      setLoading(false); 
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
      
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10">
        <h1 className="text-white text-9xl font-bold mb-6">BIENVENIDO</h1>

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
