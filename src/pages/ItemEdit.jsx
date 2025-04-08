import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import background from '../assets/fondo 2.png';

const ItemEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estado del formulario para editar el personaje, sin "slug" y con "powerstats" en su lugar
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
  const [loading, setLoading] = useState(true);

  // Cargar el personaje y precargar el formulario al montar el componente
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`https://67f1add4c733555e24add1ac.mockapi.io/api/v1/items/${id}`);
        if (!response.ok) {
          throw new Error("Error al cargar el personaje");
        }
        const data = await response.json();

        setForm({
          name: data.name || "",
          imageUrl: data.imageUrl || "",
          biography: data.biography && typeof data.biography === 'object'
            ? data.biography.fullName
            : data.biography || "",
          publisher: data.publisher || "",
          powerstats: data.powerstats ? {
            intelligence: data.powerstats.intelligence || "",
            strength: data.powerstats.strength || "",
            speed: data.powerstats.speed || "",
            durability: data.powerstats.durability || "",
            power: data.powerstats.power || "",
            combat: data.powerstats.combat || ""
          } : {
            intelligence: "",
            strength: "",
            speed: "",
            durability: "",
            power: "",
            combat: ""
          }
        });
      } catch (error) {
        toast.error("No se pudo cargar el personaje");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  // Manejo de cambios en los inputs principales
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Manejo de cambios en los campos de powerstats
  const handleChangePowerstat = (e) => {
    setForm({
      ...form,
      powerstats: {
        ...form.powerstats,
        [e.target.name]: e.target.value
      }
    });
  };

  // Envío de la actualización (PUT) del personaje
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que no queden campos principales vacíos
    if (!form.name || !form.imageUrl || !form.biography || !form.publisher) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch(`https://67f1add4c733555e24add1ac.mockapi.io/api/v1/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar el personaje");
      }
      toast.success("Personaje actualizado con éxito");
      navigate("/items");
    } catch (error) {
      console.error("❌ Error al actualizar:", error);
      toast.error("No se pudo actualizar el personaje");
    }
  };

  if (loading) return <p className="text-center">Cargando...</p>;

  return (
    <div
      className="bg-black"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        paddingTop: '140px',
        paddingBottom: '120px',
      }}
    >
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow text-black">
        <h1 className="text-2xl font-bold mb-4">Editar personaje</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: Nombre */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
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

          {/* Campo: URL de imagen */}
          <div>
            <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-1">
              URL de imagen:
            </label>
            <input
              id="imageUrl"
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="URL de imagen"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Campo: Biografía */}
          <div>
            <label htmlFor="biography" className="block text-gray-700 font-medium mb-1">
              Biografía:
            </label>
            <textarea
              id="biography"
              name="biography"
              value={form.biography}
              onChange={handleChange}
              placeholder="Biografía"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Campo: Editorial */}
          <div>
            <label htmlFor="publisher" className="block text-gray-700 font-medium mb-1">
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

          {/* Campos: Poderes (powerstats) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
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
                  onChange={handleChangePowerstat}
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
                  onChange={handleChangePowerstat}
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
                  onChange={handleChangePowerstat}
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
                  onChange={handleChangePowerstat}
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
                  onChange={handleChangePowerstat}
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
                  onChange={handleChangePowerstat}
                  placeholder="Combate"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Guardar cambios
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

export default ItemEdit;
