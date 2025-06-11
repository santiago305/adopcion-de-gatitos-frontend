// DashboardAnimals.tsx
import AnimalForm from "@/components/form/AnimalForm";
import DashboardForm from "@/components/form/DashboardForm";

export default function DashboardAnimals() {
  const columns = [
    { label: "Nombre", field: "name" },
    { label: "Especie", field: "species" },
  ];

  // Simulamos el manejo del submit
  const handleSubmit = (newAnimal: { name: string; species: string }) => {
    console.log("Formulario enviado con éxito:", newAnimal);
  };

  return (
    <DashboardForm title="Animales" columns={columns}>
      {/* Pasamos el handleSubmit como prop a AnimalForm */}
      <AnimalForm onSubmit={handleSubmit} />
    </DashboardForm>
  );
}
