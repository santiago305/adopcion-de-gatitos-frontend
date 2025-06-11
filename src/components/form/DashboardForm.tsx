import { ReactNode } from "react";
import SidebarForm from "@/components/form/SidebarForm";
import { useState } from "react";

interface DashboardFormProps {
  title: string;
  children: ReactNode;
}

export default function DashboardForm({ title, children }: DashboardFormProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCreateClick = () => {
    setIsSidebarOpen(true); // Abre el sidebar cuando se hace clic en el botón
  };

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="flex flex-1 justify-center items-center">
        <button 
          onClick={handleCreateClick} 
          className="px-6 py-3 bg-blue-500 text-white rounded-lg">
          Crear {title.toLowerCase()}
        </button>
      </div>

      {/* SidebarForm que contiene el formulario que se pasa como children */}
      {isSidebarOpen && (
        <SidebarForm
          onClose={() => setIsSidebarOpen(false)}
          side="right"
        >
          {children}
        </SidebarForm>
      )}
    </div>
  );
}
