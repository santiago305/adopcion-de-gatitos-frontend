import DashboardForm from "@/components/form/DashboardForm";
import DiseasesForm from "@/components/form/DiseasesForm";

export default function DashboardDiseases (){
  return (
    <DashboardForm title="Enfermedades">
      <DiseasesForm />
    </DashboardForm>
  )
}