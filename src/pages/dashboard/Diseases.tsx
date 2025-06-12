import DashboardForm from "@/components/form/DashboardForm";
import DiseasesForm from "@/components/form/DiseasesForm";
import { CreateDiseaseDto } from "@/types/Diseases";


export default function DashboardDiseases() {
  const columns = [
    { label: "Nombre", field: "name" },
    { label: "Gravedad", field: "severity" },
  ];

  const handleSubmit = (disease: CreateDiseaseDto) => {
    console.log("Acción completada sobre enfermedad:", disease);
  };

  return (
    <DashboardForm title="Enfermedades" columns={columns}>
      <DiseasesForm onSubmit={handleSubmit} />
    </DashboardForm>
  );
}
