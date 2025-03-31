// src/components/Header.jsx
import React from 'react';
import logo from '../assets/fondo2.jpg'; // Ajusta la ruta y el nombre del archivo
import RandomQuote from './RandomQuote';

const Header = () => {
  return (
    <header className="bg-purple-500/60  text-white p-1 flex flex-col items-center space-y-4">
      <div className="flex items-center justify-center space-x-5">
        <img src={logo} alt="Logo" className="max-h-14 object-contain" />
        <h1 className="text-5xl font-bold">Rick and Morty - Explorador Interdimensional C-137</h1>
      </div>
      <RandomQuote />
    </header>
  );
};

export default Header;