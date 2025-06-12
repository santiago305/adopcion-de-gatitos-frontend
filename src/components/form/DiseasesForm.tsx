import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreateDiseaseDto, DiseaseFormValues } from "@/types/Diseases";
import { createDiseaseSchema } from "@/schemas/diseasesSchema";
import { useFlashMessage } from "@/hooks/useFlashMessage";
import FormField from "../ui/formField";
import FieldError from "../ui/FieldError";
import { errorResponse, successResponse } from "@/common/utils/response";
import { createDisease, updateDisease } from "@/services/diseasesService";

const severityOptions = ['ninguna', 'leve', 'media', 'grave'] as const;

interface DiseasesFormProps {
  onSubmit: (data: CreateDiseaseDto) => void;
  defaultValues?: Partial<DiseaseFormValues>;
  mode?: "create" | "edit";
}

export default function DiseasesForm({ onSubmit, defaultValues, mode = "create" }: DiseasesFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const { showFlash, clearFlash } = useFlashMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DiseaseFormValues>({
    resolver: zodResolver(createDiseaseSchema),
    defaultValues,
  });

  // 👉 Aquí está la clave para que los valores se pinten al editar
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleLocalSubmit = async (data: DiseaseFormValues) => {
    clearFlash();
    setSubmitting(true);
    try {
      let response;

    // 👇 Si es edición, y hay ID, actualizamos en lugar de crear
      if (mode === "edit" && defaultValues?.id) {
        response = await updateDisease(defaultValues.id, data);
      } else {
      response = await createDisease(data);
    }
      if (response?.type === 'success') {
        showFlash(successResponse(response.message));
        onSubmit(data);
        reset();
      } else {
        showFlash(errorResponse(response?.data?.message || "Error al registrar enfermedad"));
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
            {mode === "edit" ? "Editar enfermedad" : "Registrar nueva enfermedad"}
          </CardTitle>
          <CardDescription className="text-center">
            {mode === "edit"
              ? "Modifica los datos de la enfermedad"
              : "Añade una enfermedad con su gravedad"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLocalSubmit)} className="flex flex-col gap-6">
            <FormField
              name="name"
              label="Nombre de la enfermedad"
              placeholder="Ej. Parvovirus"
              register={register}
              error={errors.name?.message}
            />

            <div className="grid gap-1 flex-1 min-w-[250px]">
              <Label htmlFor="severity">Gravedad</Label>
              <select {...register("severity")} className="p-2 rounded">
                {severityOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </option>
                ))}
              </select>
              <div className="min-h-3 h-auto">
                <FieldError error={errors.severity?.message} />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting
                ? mode === "edit"
                  ? "Actualizando..."
                  : "Registrando..."
                : mode === "edit"
                ? "Actualizar Enfermedad"
                : "Registrar Enfermedad"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
