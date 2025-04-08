// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-yellow-600/10 backdrop-blur-md text-white p-7 flex flex-col items-center space-y-4 shadow-md">
      <p className="text-sm text-white text-center">
        &copy; {new Date().getFullYear()} Liga Planetaria de SuperHeroes – ¡Explora el multiverso de SuperHeroes!
      </p>
    </footer>
  );
};

export default Footer;
