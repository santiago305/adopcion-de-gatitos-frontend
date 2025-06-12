import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/formField";
import { useFlashMessage } from "@/hooks/useFlashMessage";
import { errorResponse, successResponse } from "@/common/utils/response";

import { createPersonality, updatePersonality } from "@/services/personalityService";
import { createPersonalitySchema } from "@/schemas/personalitySchema";
import { CreatePersonalityDto, PersonalityFormValues } from "@/types/Personality";

interface PersonalityFormProps {
  onSubmit: (data: CreatePersonalityDto) => void;
  defaultValues?: Partial<PersonalityFormValues>;
  mode?: "create" | "edit";
}

export default function PersonalityForm({
  onSubmit,
  defaultValues,
  mode = "create",
}: PersonalityFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const { showFlash, clearFlash } = useFlashMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonalityFormValues>({
    resolver: zodResolver(createPersonalitySchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const handleLocalSubmit = async (data: PersonalityFormValues) => {
    clearFlash();
    setSubmitting(true);
    try {
      const response =
        mode === "edit" && defaultValues?.id
          ? await updatePersonality(defaultValues.id, data)
          : await createPersonality(data);

      if (response?.type === "success") {
        showFlash(successResponse(response.message));
        onSubmit(data);
        reset();
      } else {
        showFlash(errorResponse(response?.data?.message || "Error al registrar personalidad"));
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
            {mode === "edit" ? "Editar personalidad" : "Registrar nueva personalidad"}
          </CardTitle>
          <CardDescription className="text-center">
            {mode === "edit"
              ? "Modifica los datos de la personalidad"
              : "Agrega una personalidad al sistema"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLocalSubmit)} className="flex flex-col gap-6">
            <FormField
              name="name"
              label="Nombre de la personalidad"
              placeholder="Ej. Juguetón"
              register={register}
              error={errors.name?.message}
            />

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting
                ? mode === "edit"
                  ? "Actualizando..."
                  : "Registrando..."
                : mode === "edit"
                ? "Actualizar personalidad"
                : "Registrar personalidad"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
