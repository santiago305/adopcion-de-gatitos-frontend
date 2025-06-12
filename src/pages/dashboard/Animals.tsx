import AnimalForm from "@/components/form/AnimalForm";
import DashboardForm from "@/components/form/DashboardForm";
import {
  getAnimalsPaginated,
  deleteAnimal,
  searchAnimalByName,
} from "@/services/animalsService"

export default function DashboardAnimals() {
  const columns = [
    { label: "Nombre", field: "name" },
    { label: "Especie", field: "speciesName" }, // Asegúrate que tu backend devuelva este campo
    { label: "Adoptado", field: "adopted" },
  ];

  return (
    <DashboardForm
      title="Animales"
      columns={columns}
      fetchDataFn={getAnimalsPaginated}
      deleteFn={deleteAnimal}
      findOneFn={searchAnimalByName}
      modalFieldLabels={{
        name: "Nombre",
        speciesName: "Especie",
        adopted: "Adoptado",
      }}
      modalHiddenFields={["id", "photos", "createdAt", "updatedAt"]}
    >
      <AnimalForm />
    </DashboardForm>
  );
}
