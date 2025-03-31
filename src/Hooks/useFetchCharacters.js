// src/Hooks/useFetchCharacters.js
import { useState, useEffect, useRef } from 'react';
import { fetchCharacters } from '../Utils/api';
import { toast } from 'react-toastify';

export function useFetchCharacters(limit) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isFirstRender = useRef(true);

  useEffect(() => {
    const loadCharacters = async () => {
      console.log('Cargando personajes con límite:', limit);
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCharacters();
        console.log('Datos recibidos:', data);
        setCharacters(limit ? data.slice(0, limit) : data);
        if (!isFirstRender.current) {
          toast.success("Datos obtenidos correctamente");
        }
      } catch (err) {
        console.error('Error al obtener personajes:', err);
        setError(err);
        if (!isFirstRender.current) {
          toast.error("Error al obtener personajes");
        }
      } finally {
        setLoading(false);
        console.log('Carga finalizada');
        isFirstRender.current = false;
      }
    };

    loadCharacters();
  }, [limit]);

  return { characters, loading, error };
}