import DashboardForm from "@/components/form/DashboardForm";
import SpeciesForm from "@/components/form/SpeciesForm";
import {
  findAllSpecies,
  removeSpecies,
  searchSpeciesByName,
} from "@/services/speciesService";
import { CreateSpeciesDto } from "@/types/Species";

export default function DashboardSpecies() {
  const columns = [
    { label: "Nombre", field: "name" },
    { label: "Creado", field: "createdAt" },
    { label: "Modificado", field: "updatedAt" },
  ];

  const fieldLabels = {
    name: "Nombre",
    createdAt: "Creado el",
    updatedAt: "Modificado el",
  };

  const hiddenFields = ["id"];

  const handleSubmit = (species: CreateSpeciesDto) => {
    console.log("Acción completada sobre especie:", species);
  };

  return (
    <DashboardForm
      title="Especies"
      columns={columns}
      fetchDataFn={findAllSpecies}
      deleteFn={removeSpecies}
      findOneFn={searchSpeciesByName}
      modalFieldLabels={fieldLabels}
      modalHiddenFields={hiddenFields}
      limit={15}
    >
      <SpeciesForm onSubmit={handleSubmit} />
    </DashboardForm>
  );
}
