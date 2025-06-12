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

import { createSpecies, updateSpecies } from "@/services/speciesService";
import { CreateSpeciesDto, SpeciesFormValues } from "@/types/Species";
import { createSpeciesSchema } from "@/schemas/speciesSchema";

interface SpeciesFormProps {
  onSubmit: (data: CreateSpeciesDto) => void;
  defaultValues?: Partial<SpeciesFormValues>;
  mode?: "create" | "edit";
}

export default function SpeciesForm({ onSubmit, defaultValues, mode = "create" }: SpeciesFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const { showFlash, clearFlash } = useFlashMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SpeciesFormValues>({
    resolver: zodResolver(createSpeciesSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleLocalSubmit = async (data: SpeciesFormValues) => {
    clearFlash();
    setSubmitting(true);
    try {
      let response;
      if (mode === "edit" && defaultValues?.id) {
        response = await updateSpecies(defaultValues.id, data);
      } else {
        response = await createSpecies(data);
      }

      if (response?.type === "success") {
        showFlash(successResponse(response.message));
        onSubmit(data);
        reset();
      } else {
        showFlash(errorResponse(response?.data?.message || "Error al registrar especie"));
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
            {mode === "edit" ? "Editar especie" : "Registrar nueva especie"}
          </CardTitle>
          <CardDescription className="text-center">
            {mode === "edit" ? "Modifica los datos de la especie" : "Añade una nueva especie"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLocalSubmit)} className="flex flex-col gap-6">
            <FormField
              name="name"
              label="Nombre de la especie"
              placeholder="Ej. Canino"
              register={register}
              error={errors.name?.message}
            />
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting
                ? mode === "edit"
                  ? "Actualizando..."
                  : "Registrando..."
                : mode === "edit"
                ? "Actualizar especie"
                : "Registrar especie"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
