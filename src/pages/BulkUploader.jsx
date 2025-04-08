import React from "react";

const BulkUploader = () => {
  const handleUpload = async () => {
    const apiUrl = "https://67f1add4c733555e24add1ac.mockapi.io/api/v1/items";
    const sourceUrl =
      "https://cdn.jsdelivr.net/gh/wgg76/superhero-api@main/superheroes.json";

    try {
      const response = await fetch(sourceUrl);
      const data = await response.json();
      const first20 = data.slice(0, 20); // Cargar solo los primeros 20 personajes

      for (const hero of first20) {
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
      alert("Carga masiva finalizada ✅");
    } catch (error) {
      console.error("❌ Error al cargar personajes:", error);
    }
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Carga masiva de superhéroes</h1>
      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
      >
        Cargar 20 personajes
      </button>
    </div>
  );
};

export default BulkUploader;
