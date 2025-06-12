import DashboardForm from "@/components/form/DashboardForm";
import DiseasesForm from "@/components/form/DiseasesForm";
import { diseasesService } from "@/services/diseasesService";
import { CreateDiseaseDto } from "@/types/Diseases";


export default function DashboardDiseases() {
  const columns = [
    { label: "Nombre", field: "diseases" },
    { label: "Gravedad", field: "severity" },
  ];

  const fetchDiseasesData = async () => {
    const response = await diseasesService.findAll();
    return response?.data?.data || [];
  };

  const deleteDisease = async (id: string) => {
    return await diseasesService.remove(id);
  };

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
    fetchDataFn={fetchDiseasesData}
    deleteFn={deleteDisease}
    modalFieldLabels={fieldLabels}
    modalHiddenFields={hiddenFields}
    >
      <DiseasesForm onSubmit={handleSubmit} />
    </DashboardForm>
  );
}
