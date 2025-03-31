// src/components/VideoModal.jsx
import React from "react";

const VideoModal = ({ videoId, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo semitransparente que cierra el modal al hacer clic */}
      <div 
        className="fixed inset-0 bg-black opacity-50" 
        onClick={onClose}
      ></div>
      
      {/* Contenedor del modal */}
      <div className="bg-gray-900 rounded-lg shadow-lg z-50 p-4 max-w-3xl w-full">
        {/* Botón para cerrar */}
        <div className="flex justify-end">
          <button 
            onClick={onClose} 
            className="text-white text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        {/* Contenedor del video con relación de aspecto 16:9 */}
        <div className="relative pb-[56.25%] h-0">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Video de capítulo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
