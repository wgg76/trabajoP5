import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ItemList from "../pages/ItemList";
import ItemCreate from "../pages/ItemCreate";
import ItemEdit from "../pages/ItemEdit";
import ItemDetail from "../pages/ItemDetail";
import NotFound from "../pages/NotFound";
import BulkUploader from "../pages/BulkUploader";

const AppRouter = () => (
  <Routes>
    <Route path="/bulk-upload" element={<BulkUploader />} />
    <Route path="/" element={<Home />} />
    <Route path="/characters" element={<ItemList />} />
    <Route path="/items" element={<ItemList />} />
    <Route path="/items/create" element={<ItemCreate />} />    
    <Route path="/items/:id/edit" element={<ItemEdit />} />
    <Route path="/items/:id" element={<ItemDetail />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRouter;
