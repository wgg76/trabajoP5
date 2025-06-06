import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2"; 
import background from "../assets/fondo.jpg"; 

const ItemList = () => {
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(20); 
  const [totalItems, setTotalItems] = useState(0); 

  
  const fetchItems = async () => {
    setLoading(true);
    setError("");
    try {
     
      const response = await fetch(
        `https://67f1add4c733555e24add1ac.mockapi.io/api/v1/items?page=${currentPage}&limit=${itemsPerPage}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los personajes");
      }
      const data = await response.json();

      
      const totalResponse = await fetch(
        "https://67f1add4c733555e24add1ac.mockapi.io/api/v1/items"
      );
      const totalData = await totalResponse.json();
      setTotalItems(totalData.length);

      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchItems();
  }, [currentPage]);

  
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://67f1add4c733555e24add1ac.mockapi.io/api/v1/items/${id}`,
          { method: "DELETE" }
        );
        if (!response.ok) {
          throw new Error("Error al eliminar el personaje");
        }
        toast.success("Personaje eliminado con éxito");

        
        setItems(items.filter((item) => item.id !== id));
      } catch (error) {
        
        toast.error("No se pudo eliminar el personaje");
      }
    }
  };

  if (loading) return <p className="text-white">Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

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
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        {items.length === 0 ? (
          <p className="text-white text-center">No se encontraron personajes.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {items.map((hero) => (
              <li
                key={hero.id}
                className="bg-white rounded-sm shadow p-6 text-black flex flex-col"
              >
                <img
                  src={hero.imageUrl}
                  alt={hero.name}
                  className="w-full h-auto mb-4 rounded object-cover"
                  style={{ height: "200px" }}
                />
                <h2 className="text-xl font-bold mb-2">{hero.name}</h2>
                <div className="flex flex-col gap-2 mt-auto">
                  <Link
                    to={`/items/${hero.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-center"
                  >
                    Ver Detalle
                  </Link>
                  <Link
                    to={`/items/${hero.id}/edit`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-center"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(hero.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-center"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ItemList;
