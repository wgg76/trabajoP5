import React, { createContext, useState, useEffect } from "react";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://67f1add4c733555e24add1ac.mockapi.io/api/v1/items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ItemContext.Provider value={{ items, setItems, fetchItems, loading }}>
      {children}
    </ItemContext.Provider>
  );
};
