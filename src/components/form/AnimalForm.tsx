import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAnimalSchema } from "@/schemas/animalsSchema";
import { CreateAnimalDto, AnimalFormValues } from "@/types/Animals";
import { searchBreedBySpecies } from "@/services/breedService";
import { getDiseases } from "@/services/diseasesService";
import { getAllCharacteristics } from "@/services/characteristicsService";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/formField";
import FieldError from "@/components/ui/FieldError";
import { Label } from "@/components/ui/label";
import { getSpecies } from "@/services/speciesService";

interface AnimalFormProps {
  onSubmit: (data: CreateAnimalDto) => void;
  defaultValues?: Partial<AnimalFormValues>;
  mode?: "create" | "edit";
}

export default function AnimalForm({ onSubmit, defaultValues, mode = "create" }: AnimalFormProps) {
  const [speciesOptions, setSpeciesOptions] = useState<{ id: string; name: string }[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");
  const [breedOptions, setBreedOptions] = useState<{ id: string; name: string }[]>([]);
  const [diseaseOptions, setDiseaseOptions] = useState<{ id: string; name: string }[]>([]);
  const [characteristicsOptions, setCharacteristicsOptions] = useState<
    { id: string; color?: string; size?: string; sex?: string }[]
  >([]);


  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateAnimalDto>({
    resolver: zodResolver(createAnimalSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    const loadSpeciesAndOthers = async () => {
      const [species, diseases, characteristics] = await Promise.all([
        getSpecies(),
        getDiseases(),
        getAllCharacteristics(),
      ]);
      setSpeciesOptions(species);
      setDiseaseOptions(diseases);
      setCharacteristicsOptions(characteristics);
    };
    loadSpeciesAndOthers();
  }, []);

  useEffect(() => {
    const loadBreedsBySpecies = async () => {
      if (!selectedSpecies) return;
      const breeds = await searchBreedBySpecies(selectedSpecies);
      setBreedOptions(breeds);
    };
    loadBreedsBySpecies();
  }, [selectedSpecies]);

  const handleLocalSubmit = (data: CreateAnimalDto) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleLocalSubmit)} className="flex flex-col gap-4">
      <FormField label="Nombre" name="name" register={register} error={errors.name?.message} />

      <div className="grid gap-1">
        <Label htmlFor="speciesId">Especie</Label>
        <select
          id="speciesId"
          value={selectedSpecies}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedSpecies(value);
            setValue("breedId", ""); // limpiar la raza seleccionada
          }}
          className="p-2 rounded border"
        >
          <option value="">Seleccione una especie</option>
          {speciesOptions.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-1">
        <Label htmlFor="breedId">Raza</Label>
        <select
          id="breedId"
          {...register("breedId")}
          className="p-2 rounded border"
          disabled={!selectedSpecies}
        >
          <option value="">Seleccione una raza</option>
          {breedOptions.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
        <FieldError error={errors.breedId?.message} />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="diseaseId">Enfermedad</Label>
        <select id="diseaseId" {...register("diseaseId" as const)} className="p-2 rounded border">
          <option value="">Seleccione una enfermedad</option>
          {diseaseOptions.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        <FieldError error={errors.diseaseId?.message} />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="healthStatus">Estado de salud</Label>
        <select id="healthStatus" {...register("healthStatus", { setValueAs: v => v === "true" })} className="p-2 rounded border">
          <option value="">Seleccione</option>
          <option value="true">Saludable</option>
          <option value="false">Enfermo</option>
        </select>
        <FieldError error={errors.healthStatus?.message} />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="adopted">¿Adoptado?</Label>
        <select id="adopted" {...register("adopted", { setValueAs: v => v === "true" })} className="p-2 rounded border">
          <option value="">Seleccione</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
        <FieldError error={errors.adopted?.message} />
      </div>

      <FormField label="URL de foto" name="photos" register={register} error={errors.photos?.message} />

      <div className="grid gap-1">
        <Label htmlFor="characteristicsId">Características</Label>
        <select id="characteristicsId" {...register("characteristicsId")} className="p-2 rounded border">
          <option value="">Seleccione una opción</option>
          {characteristicsOptions.map((c) => (
            <option key={c.id} value={c.id}>
              {`${c.color || ""} / ${c.size || ""} / ${c.sex || ""}`.trim()}
            </option>
          ))}
        </select>
        <FieldError error={errors.characteristicsId?.message} />
      </div>


      <FormField label="Información" name="information" register={register} error={errors.information?.message} />

      <div className="grid gap-1">
        <Label htmlFor="status">Estado del animal</Label>
        <select id="status" {...register("status", { setValueAs: v => v === "true" })} className="p-2 rounded border">
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
