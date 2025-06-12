import { useState } from "react";

interface AnimalFormProps {
  onSubmit: (newAnimal: { name: string; species: string }) => void;
}

export default function AnimalForm({ onSubmit }: AnimalFormProps) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && species) {
      onSubmit({ name, species }); // Llamamos a la función onSubmit con los datos del formulario
      setName(""); // Limpiamos el formulario después de enviarlo
      setSpecies("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block">Nombre del animal</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="species" className="block">Especie</label>
        <input
          id="species"
          type="text"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded">
        Crear Animal
      </button>
    </form>
  );
}
