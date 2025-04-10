import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { ItemContext } from "../context/ItemContext";
import background from "../assets/fondo 2.png";

const ItemCreate = () => {
  const { setItems } = useContext(ItemContext);
  const navigate = useNavigate();

  
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    biography: "",
    publisher: "",
    powerstats: {
      intelligence: "",
      strength: "",
      speed: "",
      durability: "",
      power: "",
      combat: ""
    }
  });

  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleChangePowerstats = (e) => {
    setForm({
      ...form,
      powerstats: {
        ...form.powerstats,
        [e.target.name]: e.target.value,
      },
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (
      !form.name ||
      !form.imageUrl ||
      !form.biography ||
      !form.publisher
    ) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch(
        "https://67f1add4c733555e24add1ac.mockapi.io/api/v1/items",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.msg || "Error al crear el personaje");
      }

      toast.success("¡Personaje creado!");

      
      const updatedItems = await fetch(
        "https://67f1add4c733555e24add1ac.mockapi.io/api/v1/items"
      ).then((res) => res.json());

      setItems(updatedItems);
      navigate("/items");
    } catch (error) {
      console.error("❌ Error al crear:", error);
      toast.error("No se pudo crear el personaje");
    }
  };

  return (
    <div
      className="bg-black"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        paddingTop: "140px",
        paddingBottom: "120px",
      }}
    >
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow text-black">
        <h1 className="text-2xl font-bold mb-4">Agregar personaje</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
              Nombre:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre"
              className="w-full p-2 border rounded"
            />
          </div>

          
          <div>
            <label htmlFor="imageUrl" className="block font-medium text-gray-700 mb-1">
              URL de imagen:
            </label>
            <input
              id="imageUrl"
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="Ingresa el link de una imagen"
              className="w-full p-2 border rounded"
            />
          </div>

          
          <div>
            <label htmlFor="biography" className="block font-medium text-gray-700 mb-1">
              Biografía:
            </label>
            <textarea
              id="biography"
              name="biography"
              value={form.biography}
              onChange={handleChange}
              placeholder="Escribe la biografía"
              className="w-full p-2 border rounded"
            />
          </div>

          
          <div>
            <label htmlFor="publisher" className="block font-medium text-gray-700 mb-1">
              Editorial:
            </label>
            <input
              id="publisher"
              type="text"
              name="publisher"
              value={form.publisher}
              onChange={handleChange}
              placeholder="Editorial"
              className="w-full p-2 border rounded"
            />
          </div>

          
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Poderes:
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="intelligence" className="block text-gray-600 text-sm">
                  Inteligencia:
                </label>
                <input
                  id="intelligence"
                  type="text"
                  name="intelligence"
                  value={form.powerstats.intelligence}
                  onChange={handleChangePowerstats}
                  placeholder="Inteligencia"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="strength" className="block text-gray-600 text-sm">
                  Fuerza:
                </label>
                <input
                  id="strength"
                  type="text"
                  name="strength"
                  value={form.powerstats.strength}
                  onChange={handleChangePowerstats}
                  placeholder="Fuerza"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="speed" className="block text-gray-600 text-sm">
                  Velocidad:
                </label>
                <input
                  id="speed"
                  type="text"
                  name="speed"
                  value={form.powerstats.speed}
                  onChange={handleChangePowerstats}
                  placeholder="Velocidad"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="durability" className="block text-gray-600 text-sm">
                  Durabilidad:
                </label>
                <input
                  id="durability"
                  type="text"
                  name="durability"
                  value={form.powerstats.durability}
                  onChange={handleChangePowerstats}
                  placeholder="Durabilidad"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="power" className="block text-gray-600 text-sm">
                  Poder:
                </label>
                <input
                  id="power"
                  type="text"
                  name="power"
                  value={form.powerstats.power}
                  onChange={handleChangePowerstats}
                  placeholder="Poder"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="combat" className="block text-gray-600 text-sm">
                  Combate:
                </label>
                <input
                  id="combat"
                  type="text"
                  name="combat"
                  value={form.powerstats.combat}
                  onChange={handleChangePowerstats}
                  placeholder="Combate"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>

          
          <div className="flex justify-between mt-3">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Guardar personaje
            </button>
            <Link
              to="/items"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemCreate;
