import DashboardForm from "@/components/form/DashboardForm";
import AnimalForm from "@/components/form/AnimalForm";
import {
  getAnimalsPaginated,
  deleteAnimal,
  searchAnimalsByName,
} from "@/services/animalsService";
import { CreateAnimalDto } from "@/types/Animals";

export default function DashboardAnimals() {
  const columns = [
    { label: "Nombre", field: "name" },
    { label: "Raza", field: "breed" },
    { label: "Enfermedad", field: "disease" },
    { label: "Adoptado", field: "adopted" },
    { label: "Estado", field: "status" },
  ];

  const fieldLabels = {
    name: "Nombre",
    breed: "Raza",
    disease: "Enfermedad",
    healthStatus: "Salud",
    adopted: "Adoptado",
    photos: "Foto",
    information: "Información",
    status: "Estado",
    color: "Color",
    size: "Tamaño",
    weight: "Peso",
    fur: "Pelaje",
    sex: "Sexo",
    age: "Edad",
    sterilized: "Esterilizado",
  };

  const hiddenFields = [
    "id",
    "photos",
    "createdAt",
    "updatedAt",
    "deleted",
    "characteristicsId",
  ];

  const handleSubmit = (animal: CreateAnimalDto) => {
    console.log("Acción completada sobre animal:", animal);
  };

  return (
    <DashboardForm
      title="Animales"
      columns={columns}
      fetchDataFn={getAnimalsPaginated}
      deleteFn={deleteAnimal}
      findOneFn={searchAnimalsByName}
      modalFieldLabels={fieldLabels}
      modalHiddenFields={hiddenFields}
      limit={15}
    >
       <AnimalForm onSubmit={handleSubmit} />
    </DashboardForm>
  );
}
