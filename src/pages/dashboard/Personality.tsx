import DashboardForm from "@/components/form/DashboardForm";
import PersonalityForm from "@/components/form/PersonalityForm";
import {
  findAllPersonalities,
  removePersonality,
  searchPersonalityByName,
} from "@/services/personalityService";
import { CreatePersonalityDto } from "@/types/Personality";

export default function DashboardPersonality() {
  const columns = [
    { label: "Nombre", field: "name" },
  ];

  const fieldLabels = {
    name: "Nombre",
    createdAt: "Creado el",
    updatedAt: "Modificado el",
  };

  const hiddenFields = ["id"];

  const handleSubmit = (personality: CreatePersonalityDto) => {
    console.log("Acción completada sobre personalidad:", personality);
  };

  return (
    <DashboardForm
      title="Personalidades"
      columns={columns}
      fetchDataFn={findAllPersonalities}
      deleteFn={removePersonality}
      findOneFn={searchPersonalityByName}
      modalFieldLabels={fieldLabels}
      modalHiddenFields={hiddenFields}
      limit={15}
    >
      <PersonalityForm onSubmit={handleSubmit} />
    </DashboardForm>
  );
}
