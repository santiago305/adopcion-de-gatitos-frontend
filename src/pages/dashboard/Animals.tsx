import AnimalForm from "@/components/form/AnimalForm";
import SidebarForm from "@/components/form/SidebarForm";
import { useState } from "react";

export default function DashboardAnimals() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCreateAnimalClick = () => {
    setIsSidebarOpen(true); // Abre el sidebar cuando se hace clic en el botón
  };

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-4xl font-bold">Animales</h1>
      <div className="flex flex-1 justify-center items-center">
        <button 
          onClick={handleCreateAnimalClick} 
          className="px-6 py-3 bg-blue-500 text-white rounded-lg">
          Crear un animal
        </button>
      </div>

      {/* SidebarForm que contiene el formulario para crear un animal */}
      {isSidebarOpen && (
        <SidebarForm
          onClose={() => setIsSidebarOpen(false)}
          side="right"
        >
          <AnimalForm />
        </SidebarForm>
      )}
    </div>
  );
}
