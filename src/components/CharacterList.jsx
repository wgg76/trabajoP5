// src/components/CharacterList.jsx
import React, { useMemo } from 'react';
import CharacterCard from './CharacterCard';

const CharacterList = ({ characters }) => {
  console.log('Listado de personajes:', characters);
  
  const renderedCharacters = useMemo(() => {
    return characters.map((character) => (
      <CharacterCard key={character.id} character={character} />
    ));
  }, [characters]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {renderedCharacters}
    </div>
  );
};

export default CharacterList;
