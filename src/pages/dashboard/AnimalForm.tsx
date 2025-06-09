
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface AnimalData {
  name: string;
  images: string[];
}

const AnimalForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [jsonOutput, setJsonOutput] = useState<AnimalData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setImages((prev) => [...prev, ...files]);
        setPreviews((prev) => [...prev, ...newPreviews]);
        setError(null);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || images.length === 0) {
      setError('Por favor, ingresa un nombre y selecciona al menos una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      const result: AnimalData = await response.json();
      setJsonOutput(result);
      setError(null);
      alert('Imágenes guardadas y JSON generado exitosamente.');
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un error al procesar la solicitud. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Formulario de Animal</h2>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre del Animal
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ej. Perrito"
            required
          />
        </div>
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Seleccionar Imágenes
          </label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        {previews.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {previews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Vista previa ${index + 1}`}
                className="w-full h-32 object-cover rounded-md"
              />
            ))}
          </div>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Enviar
        </button>
      </form>
      {jsonOutput && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-medium">JSON Generado:</h3>
          <pre className="text-sm text-gray-800">{JSON.stringify(jsonOutput, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AnimalForm;