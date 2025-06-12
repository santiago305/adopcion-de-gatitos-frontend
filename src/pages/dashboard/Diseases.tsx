import DashboardForm from "@/components/form/DashboardForm";
import DiseasesForm from "@/components/form/DiseasesForm";
import { findAllDiseases, removeDiseases } from "@/services/diseasesService";
import { CreateDiseaseDto } from "@/types/Diseases";


export default function DashboardDiseases() {
  const columns = [
    { label: "Nombre", field: "name" },
    { label: "Gravedad", field: "severity" },
  ];


  const fieldLabels = {
    diseases: "Enfermedad",
    severity: "Gravedad",
  };

  const hiddenFields = ["id"];

  const handleSubmit = (disease: CreateDiseaseDto) => {
    console.log("Acción completada sobre enfermedad:", disease);
  };

  return (
    <DashboardForm 
    title="Enfermedades"
    columns={columns}
    fetchDataFn={findAllDiseases}
    deleteFn={removeDiseases}
    modalFieldLabels={fieldLabels}
    modalHiddenFields={hiddenFields}
    >
      <DiseasesForm onSubmit={handleSubmit} />
    </DashboardForm>
  );
}
