// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-purple-500/60 text-white p-4 flex flex-col items-center">
      <p className="text-sm text-white text-center">
        &copy; {new Date().getFullYear()} Rick and Morty – ¡Explora el multiverso con humor y locura!
      </p>
    </footer>
  );
};

export default Footer;
