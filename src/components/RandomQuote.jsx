// src/components/RandomQuote.jsx
import React, { useEffect, useState } from 'react';
import { rickAndMortyQuotes } from '../Utils/quotes';

const RandomQuote = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * rickAndMortyQuotes.length);
    setQuote(rickAndMortyQuotes[randomIndex]);
  }, []);

  return (
    <div className="p-4 text-center text-xl font-semibold text-white">
      {quote}
    </div>
  );
};

export default RandomQuote;
