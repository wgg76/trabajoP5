import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Background from '../assets/fondo.jpg'; 

const ItemDetail = () => {
  const { id } = useParams();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(
          `https://67f1add4c733555e24add1ac.mockapi.io/api/v1/items/${id}`
        );
        if (!response.ok) {
          throw new Error('Error al obtener los datos del héroe');
        }
        const data = await response.json();
        setHero(data);
      } catch (error) {
        console.error('Error al cargar los datos del héroe:', error);
        toast.error('No se pudo cargar los datos del héroe.');
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, [id]);

  if (loading) return <p className="text-center text-xs">Cargando...</p>;
  if (!hero) return <p className="text-center text-xs">No se encontraron datos.</p>;

  return (
    <div
      className="bg-black"
      style={{
        backgroundImage: `url(${Background})`,
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
      <div className="max-w-xs mx-auto p-2 border border-gray-300 rounded shadow text-xs bg-white bg-opacity-90">
        <h1 className="text-center font-bold mb-1 text-base">{hero.name}</h1>
        {hero.imageUrl ? (
          <img
            src={hero.imageUrl}
            alt={hero.name}
            className="w-full h-auto mb-2 rounded"
          />
        ) : (
          <p className="text-center">Sin imagen</p>
        )}
        <div className="mb-1 font-bold text-black">
          <h2 className="font-bold underline">Biography</h2>
          <p><strong>Full Name:</strong> {hero.biography?.fullName || "N/A"}</p>
          <p><strong>Alter Egos:</strong> {hero.biography?.alterEgos || "N/A"}</p>
          <p>
            <strong>Aliases:</strong>{" "}
            {hero.biography?.aliases ? hero.biography.aliases.join(", ") : "N/A"}
          </p>
          <p><strong>Birth:</strong> {hero.biography?.placeOfBirth || "N/A"}</p>
          <p><strong>First App.:</strong> {hero.biography?.firstAppearance || "N/A"}</p>
          <p><strong>Publisher:</strong> {hero.biography?.publisher || "N/A"}</p>
          <p><strong>Align.:</strong> {hero.biography?.alignment || "N/A"}</p>
        </div>
        <div className="mb-1 font-bold text-black">
          <h2 className="font-bold underline">Powerstats</h2>
          <p><strong>Int:</strong> {hero.powerstats?.intelligence || "N/A"}</p>
          <p><strong>Str:</strong> {hero.powerstats?.strength || "N/A"}</p>
          <p><strong>Spd:</strong> {hero.powerstats?.speed || "N/A"}</p>
          <p><strong>Durb:</strong> {hero.powerstats?.durability || "N/A"}</p>
          <p><strong>Pwr:</strong> {hero.powerstats?.power || "N/A"}</p>
          <p><strong>Cmbt:</strong> {hero.powerstats?.combat || "N/A"}</p>
        </div>
        <div className="mb-1 font-bold text-black">
          <h2 className="font-bold underline">Appearance</h2>
          <p><strong>Gender:</strong> {hero.appearance?.gender || "N/A"}</p>
          <p><strong>Race:</strong> {hero.appearance?.race || "N/A"}</p>
          <p>
            <strong>Height:</strong>{" "}
            {hero.appearance?.height ? hero.appearance.height.join(" / ") : "N/A"}
          </p>
          <p>
            <strong>Weight:</strong>{" "}
            {hero.appearance?.weight ? hero.appearance.weight.join(" / ") : "N/A"}
          </p>
          <p><strong>Eyes:</strong> {hero.appearance?.eyeColor || "N/A"}</p>
          <p><strong>Hair:</strong> {hero.appearance?.hairColor || "N/A"}</p>
        </div>
        <div className="mb-1 font-bold text-black">
          <h2 className="font-bold underline">Work</h2>
          <p><strong>Occ:</strong> {hero.work?.occupation || "N/A"}</p>
          <p><strong>Base:</strong> {hero.work?.base || "N/A"}</p>
        </div>
        <div className="mb-1 font-bold text-black">
          <h2 className="font-bold underline">Connections</h2>
          <p>
            <strong>Group:</strong> {hero.connections?.groupAffiliation || "N/A"}
          </p>
          <p>
            <strong>Relatives:</strong> {hero.connections?.relatives || "N/A"}
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default ItemDetail;
