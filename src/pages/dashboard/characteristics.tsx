import DashboardForm from "@/components/form/DashboardForm";
import CharacteristicsForm from "@/components/form/CharacteristicsForm";
import {
  findAllCharacteristics,
  removeCharacteristic,
  searchCharacteristicsByKeyword,
} from "@/services/characteristicsService";
import { CreateCharacteristicsDto } from "@/types/Characteristics";

export default function DashboardCharacteristics() {
  const columns = [
    { label: "Color", field: "color" },
    { label: "Tamaño", field: "size" },
    { label: "Peso", field: "weight" },
    { label: "Pelaje", field: "fur" },
    { label: "Sexo", field: "sex" },
    { label: "Edad", field: "age" },
    { label: "Esterilizado", field: "sterilized" },
    { label: "Personalidad", field: "personality" },
  ];

  const fieldLabels = {
    color: "Color",
    size: "Tamaño",
    weight: "Peso",
    fur: "Pelaje",
    sex: "Sexo",
    age: "Edad",
    sterilized: "Esterilizado",
    personality: "Personalidad",
    createdAt: "Creado el",
    updatedAt: "Modificado el",
  };

  const hiddenFields = ["id", "personalityId"];

  const handleSubmit = (data: CreateCharacteristicsDto) => {
    console.log("Acción completada sobre característica:", data);
  };

  return (
    <DashboardForm
      title="Características"
      columns={columns}
      fetchDataFn={findAllCharacteristics}
      deleteFn={removeCharacteristic}
      findOneFn={searchCharacteristicsByKeyword}
      modalFieldLabels={fieldLabels}
      modalHiddenFields={hiddenFields}
      limit={15}
    >
      <CharacteristicsForm onSubmit={handleSubmit} />
    </DashboardForm>
  );
}
