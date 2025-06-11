import AnimalForm from "@/components/form/AnimalForm";
import DashboardForm from "@/components/form/DashboardForm";

export default function DashboardAnimals() {
  return (
    <DashboardForm title="Animales">
      <AnimalForm />
    </DashboardForm>
  );
}
