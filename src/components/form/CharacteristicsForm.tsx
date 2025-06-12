import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormField from "@/components/ui/formField";
import FieldError from "@/components/ui/FieldError";
import { useFlashMessage } from "@/hooks/useFlashMessage";
import { errorResponse, successResponse } from "@/common/utils/response";

import { createCharacteristic, updateCharacteristic } from "@/services/characteristicsService";
import { CreateCharacteristicsDto, CharacteristicsFormValues } from "@/types/Characteristics";
import { createCharacteristicsSchema } from "@/schemas/characteristicsSchema";
import { getPersonalities } from "@/services/personalityService";

interface CharacteristicsFormProps {
  onSubmit: (data: CreateCharacteristicsDto) => void;
  defaultValues?: Partial<CharacteristicsFormValues>;
  mode?: "create" | "edit";
}

export default function CharacteristicsForm({ onSubmit, defaultValues, mode = "create" }: CharacteristicsFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [personalityOptions, setPersonalityOptions] = useState<{ id: string; name: string }[]>([]);
  const { showFlash, clearFlash } = useFlashMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CharacteristicsFormValues>({
    resolver: zodResolver(createCharacteristicsSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    const loadPersonalities = async () => {
      try {
        const data = await getPersonalities();
        setPersonalityOptions(data);
      } catch (err) {
        console.error("Error cargando personalidades:", err);
      }
    };
    loadPersonalities();
  }, []);

  const handleLocalSubmit = async (data: CharacteristicsFormValues) => {
    clearFlash();
    setSubmitting(true);
    try {
      const response = mode === "edit" && defaultValues?.id
        ? await updateCharacteristic(defaultValues.id, data)
        : await createCharacteristic(data);

      if (response?.type === "success") {
        showFlash(successResponse(response.message));
        onSubmit(data);
        reset();
      } else {
        showFlash(errorResponse(response?.data?.message || "Error al registrar característica"));
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
            {mode === "edit" ? "Editar característica" : "Registrar nueva característica"}
          </CardTitle>
          <CardDescription className="text-center">
            {mode === "edit"
              ? "Modifica los datos de la característica"
              : "Registra una característica asociada a una personalidad"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLocalSubmit)} className="flex flex-col gap-6">
            <FormField name="color" label="Color" placeholder="Ej. Marrón" register={register} error={errors.color?.message} />
            <FormField name="size" label="Tamaño" placeholder="Ej. Mediano" register={register} error={errors.size?.message} />
            <FormField name="weight" label="Peso" placeholder="Ej. 5 kg" register={register} error={errors.weight?.message} />
            <FormField name="fur" label="Pelaje" placeholder="Ej. Corto" register={register} error={errors.fur?.message} />
            <FormField name="sex" label="Sexo" placeholder="Ej. Macho" register={register} error={errors.sex?.message} />
            <FormField name="age" label="Edad" placeholder="Ej. 2 años" register={register} error={errors.age?.message} />

            <div className="grid gap-1">
              <Label htmlFor="sterilized">¿Esterilizado?</Label>
              <select {...register("sterilized")} className="p-2 rounded w-full border">
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
              <div className="min-h-3 h-auto">
                <FieldError error={errors.sterilized?.message} />
              </div>
            </div>

            <div className="grid gap-1">
              <Label htmlFor="personalityId">Personalidad</Label>
              <select {...register("personalityId")} className="p-2 rounded w-full border">
                <option value="">Seleccione una personalidad</option>
                {personalityOptions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <div className="min-h-3 h-auto">
                <FieldError error={errors.personalityId?.message} />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting
                ? mode === "edit"
                  ? "Actualizando..."
                  : "Registrando..."
                : mode === "edit"
                ? "Actualizar característica"
                : "Registrar característica"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
