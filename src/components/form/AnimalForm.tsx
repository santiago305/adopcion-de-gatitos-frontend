import { useState } from "react";

export default function AnimalForm() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar los datos del formulario al backend
    console.log({ name, species });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block">Nombre del animal</label>
        <input 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded" 
          type="text"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="species" className="block">Especie</label>
        <input 
          id="species" 
          value={species} 
          onChange={(e) => setSpecies(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded" 
          type="text"
          required
        />
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded">
        Crear Animal
      </button>
    </form>
  );
}
