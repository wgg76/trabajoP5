import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ItemContext } from "../context/ItemContext"; // Asegúrate de importar el contexto

const ItemCreate = () => {
  const { setItems } = useContext(ItemContext); // Accedemos a setItems para actualizar la lista de personajes
  const [form, setForm] = useState({
    name: "",
    slug: "",
    imageUrl: "",
    biography: "",
    publisher: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.slug || !form.imageUrl || !form.biography || !form.publisher) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch(
        "https://67f1add4c733555e24add1ac.mockapi.io/api/v1/items", // URL de la API
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("❌ Error al crear:", error);
        throw new Error(error.msg || "Error al crear el personaje");
      }

      toast.success("¡Personaje creado!");

      // Recargar la lista de personajes
      const updatedItems = await fetch("https://67f1add4c733555e24add1ac.mockapi.io/api/v1/items")
        .then((res) => res.json())
        .catch((error) => {
          console.error("❌ Error al cargar los personajes:", error);
        });

      setItems(updatedItems); // Actualizar el contexto con los nuevos personajes

      navigate("/items"); // Redirige a la lista de personajes
    } catch (error) {
      console.error("❌ Error al crear:", error);
      toast.error("No se pudo crear el personaje");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-4">Crear personaje</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Slug"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="URL de imagen"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="biography"
          value={form.biography}
          onChange={handleChange}
          placeholder="Biografía"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="publisher"
          value={form.publisher}
          onChange={handleChange}
          placeholder="Editorial"
          className="w-full p-2 border rounded"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Guardar personaje
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemCreate;
