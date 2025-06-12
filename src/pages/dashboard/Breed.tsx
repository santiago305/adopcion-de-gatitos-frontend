import DashboardForm from "@/components/form/DashboardForm";
import BreedForm from "@/components/form/BreedForm";
import {
  findAllBreeds,
  removeBreed,
  searchBreedByName,
} from "@/services/breedService";
import { CreateBreedDto } from "@/types/Breed";

export default function DashboardBreed() {
  const columns = [
    { label: "Raza", field: "name" },
    { label: "Especie", field: "specie" },
  ];

  const fieldLabels = {
    name: "Raza",
    specie: "Especie",
    createdAt: "Creado el",
    updatedAt: "Modificado el",
  };

  const hiddenFields = ["id", "speciesid"];

  const handleSubmit = (breed: CreateBreedDto) => {
    console.log("Acción completada sobre raza:", breed);
  };

  return (
    <DashboardForm
      title="Razas"
      columns={columns}
      fetchDataFn={findAllBreeds}
      deleteFn={removeBreed}
      findOneFn={searchBreedByName}
      modalFieldLabels={fieldLabels}
      modalHiddenFields={hiddenFields}
      limit={15}
    >
      <BreedForm onSubmit={handleSubmit} />
    </DashboardForm>
  );
}
