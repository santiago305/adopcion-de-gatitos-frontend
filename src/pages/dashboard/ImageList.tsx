
import React, { useState, useEffect } from 'react';

const ImageList: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const backendPort = '3000'; // Ajusta si el puerto del backend es diferente

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`http://localhost:${backendPort}/api/upload/images`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${await response.text()}`);
        }
        const data: string[] = await response.json();
        console.log('Datos recibidos del endpoint:', data); // Log para depuración
        setImages(data);
        setError(null);
      } catch (error) {
        console.error('Error al obtener imágenes:', error);
        setError('Hubo un error al cargar las imágenes. Verifica el puerto del backend o los logs.');
      }
    };

    fetchImages();
  }, [backendPort]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Galería de Imágenes</h2>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((imagePath, index) => {
          const fullUrl = `http://localhost:${backendPort}/${encodeURI(imagePath)}`;

          console.log(`Intentando cargar imagen: ${fullUrl}`); // Depuración de URL
          return (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md">
              <img
                src={fullUrl}
                alt={`Imagen ${index + 1}`}
                className="w-full h-64 object-cover rounded-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  console.error(`Error al cargar ${fullUrl}:`, {
                    target: target.src,
                    status: target.naturalWidth === 0 ? '404 o CORS' : 'Otro error',
                  });
                  setError(`No se pudo cargar ${imagePath}. Verifica el archivo o el puerto.`);
                }}
              />
              <p className="mt-2 text-sm text-gray-600">{imagePath}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageList;
