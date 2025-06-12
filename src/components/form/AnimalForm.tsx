import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAnimalSchema } from "@/schemas/animalsSchema";
import { CreateAnimalDto, AnimalFormValues } from "@/types/Animals";
import { getBreed } from "@/services/breedService";
import { getDiseases } from "@/services/diseasesService";
import { getAllCharacteristics } from "@/services/characteristicsService";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/formField";
import FieldError from "@/components/ui/FieldError";
import { Label } from "@/components/ui/label";

interface AnimalFormProps {
  onSubmit: (data: CreateAnimalDto) => void;
  defaultValues?: Partial<AnimalFormValues>;
  mode?: "create" | "edit";
}

export default function AnimalForm({ onSubmit, defaultValues, mode = "create" }: AnimalFormProps) {
  const [breedOptions, setBreedOptions] = useState<{ id: string; name: string }[]>([]);
  const [diseaseOptions, setDiseaseOptions] = useState<{ id: string; name: string }[]>([]);
  const [characteristicsOptions, setCharacteristicsOptions] = useState<{ id: string; name: string }[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAnimalDto>({
    resolver: zodResolver(createAnimalSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    const loadSelects = async () => {
      const [breeds, diseases, characteristics] = await Promise.all([
        getBreed(),
        getDiseases(),
        getAllCharacteristics(),
      ]);
      setBreedOptions(breeds);
      setDiseaseOptions(diseases);
      setCharacteristicsOptions(characteristics);
    };
    loadSelects();
  }, []);

  const handleLocalSubmit = (data: CreateAnimalDto) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleLocalSubmit)} className="flex flex-col gap-4 h-full overflow-y-auto">
      <FormField label="Nombre" name="name" register={register} error={errors.name?.message} />

      <div className="grid gap-1">
        <Label>Raza</Label>
        <select {...register("breedId")} className="p-2 rounded border">
          <option value="">Seleccione una raza</option>
          {breedOptions.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
        <FieldError error={errors.breedId?.message} />
      </div>

      <div className="grid gap-1">
        <Label>Enfermedad</Label>
        <select {...register("diseaseId")} className="p-2 rounded border">
          <option value="">Seleccione una enfermedad</option>
          {diseaseOptions.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        <FieldError error={errors.diseaseId?.message} />
      </div>

      <div className="grid gap-1">
        <Label>Estado de salud</Label>
        <select {...register("healthStatus", { setValueAs: v => v === "true" })} className="p-2 rounded border">
          <option value="">Seleccione</option>
          <option value="true">Saludable</option>
          <option value="false">Enfermo</option>
        </select>
        <FieldError error={errors.healthStatus?.message} />
      </div>

      <div className="grid gap-1">
        <Label>¿Adoptado?</Label>
        <select {...register("adopted", { setValueAs: v => v === "true" })} className="p-2 rounded border">
          <option value="">Seleccione</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
        <FieldError error={errors.adopted?.message} />
      </div>

      <FormField label="URL de foto" name="photos" register={register} error={errors.photos?.message} />

      <div className="grid gap-1">
        <Label>Características</Label>
        <select {...register("characteristicsId")} className="p-2 rounded border">
          <option value="">Seleccione una opción</option>
          {characteristicsOptions.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <FieldError error={errors.characteristicsId?.message} />
      </div>

      <FormField label="Información" name="information" register={register} error={errors.information?.message} />

      <div className="grid gap-1">
        <Label>Estado del animal</Label>
        <select {...register("status", { setValueAs: v => v === "true" })} className="p-2 rounded border">
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
        <FieldError error={errors.status?.message} />
      </div>

      <Button type="submit" className="w-full">
        {mode === "edit" ? "Actualizar animal" : "Registrar animal"}
      </Button>
    </form>
  );
}