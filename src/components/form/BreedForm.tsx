import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormField from "../ui/formField";
import FieldError from "../ui/FieldError";
import { useFlashMessage } from "@/hooks/useFlashMessage";
import { errorResponse, successResponse } from "@/common/utils/response";

import { createBreed, updateBreed } from "@/services/breedService";
import { CreateBreedDto, BreedFormValues } from "@/types/Breed";
import { createBreedSchema } from "@/schemas/breedSchema";
import { getAllSpeciesForSelect } from "@/services/speciesService"; // 👈 para llenar el select

interface BreedFormProps {
  onSubmit: (data: CreateBreedDto) => void;
  defaultValues?: Partial<BreedFormValues>;
  mode?: "create" | "edit";
}

export default function BreedForm({ onSubmit, defaultValues, mode = "create" }: BreedFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [speciesOptions, setSpeciesOptions] = useState<{ id: string; name: string }[]>([]);
  const { showFlash, clearFlash } = useFlashMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BreedFormValues>({
    resolver: zodResolver(createBreedSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    // Cargar todas las especies para el select
    const loadSpecies = async () => {
      try {
        const data = await getAllSpeciesForSelect();
        setSpeciesOptions(data);
      } catch (err) {
        console.error("Error cargando especies:", err);
      }
    };
    loadSpecies();
  }, []);

  const handleLocalSubmit = async (data: BreedFormValues) => {
    clearFlash();
    setSubmitting(true);
    try {
      let response;
      if (mode === "edit" && defaultValues?.id) {
        response = await updateBreed(defaultValues.id, data);
      } else {
        response = await createBreed(data);
      }

      if (response?.type === "success") {
        showFlash(successResponse(response.message));
        onSubmit(data);
        reset();
      } else {
        showFlash(errorResponse(response?.data?.message || "Error al registrar raza"));
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Error inesperado";
      showFlash(errorResponse(message));
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {mode === "edit" ? "Editar raza" : "Registrar nueva raza"}
          </CardTitle>
          <CardDescription className="text-center">
            {mode === "edit" ? "Modifica los datos de la raza" : "Asocia una nueva raza a una especie"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLocalSubmit)} className="flex flex-col gap-6">
            <FormField
              name="name"
              label="Nombre de la raza"
              placeholder="Ej. Labrador"
              register={register}
              error={errors.name?.message}
            />

            <div className="grid gap-1">
              <Label htmlFor="speciesId">Especie</Label>
              <select {...register("speciesId")} className="p-2 rounded w-full border">
                <option value="">Seleccione una especie</option>
                {speciesOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <div className="min-h-3 h-auto">
                <FieldError error={errors.speciesId?.message} />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting
                ? mode === "edit"
                  ? "Actualizando..."
                  : "Registrando..."
                : mode === "edit"
                ? "Actualizar raza"
                : "Registrar raza"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
