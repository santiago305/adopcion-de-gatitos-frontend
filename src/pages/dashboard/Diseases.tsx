import DashboardForm from "@/components/form/DashboardForm";
import DiseasesForm from "@/components/form/DiseasesForm";

export default function DashboardDiseases (){
  const columns = [
      { label: "Nombre", field: "name" },
      { label: "Especie", field: "species" },
    ];
  
    const handleSubmit = (newAnimal: { name: string; species: string }) => {
      console.log("Formulario enviado con éxito:", newAnimal);
    };
  
    return (
      <DashboardForm title="Enfermedades" columns={columns}>
        {/* Pasamos el handleSubmit como prop a AnimalForm */}
        <DiseasesForm onSubmit={handleSubmit} />
      </DashboardForm>
    );
}