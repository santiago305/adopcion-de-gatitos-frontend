// src/components/forms/DiseaseForm.tsx
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { diseasesService } from "@/services/diseasesService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreateDiseaseDto } from "@/types/Diseases";
import { createDiseaseSchema } from "@/schemas/diseasesSchema";
import { useFlashMessage } from "@/hooks/useFlashMessage";
import FormField from "../ui/formField";
import FieldError from "../ui/FieldError";

const severityOptions = ['ninguna', 'leve', 'media', 'grave'] as const;

export default function DiseaseForm({ className, ...props }: React.ComponentProps<"div">) {
  const [submitting, setSubmitting] = useState(false);
  const { showFlash, clearFlash } = useFlashMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateDiseaseDto>({
    resolver: zodResolver(createDiseaseSchema),
  });

  const onSubmit = async (data: CreateDiseaseDto) => {
    clearFlash();
    setSubmitting(true);
    try {
      const response = await diseasesService.create(data);
      if (response?.data?.type === 'success') {
        showFlash({ type: 'success', message: response.data.message });
        reset();
      } else {
        showFlash({ type: 'error', message: response?.data?.message || 'Error al registrar enfermedad' });
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error inesperado';
      showFlash({ type: 'error', message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Registrar nueva enfermedad</CardTitle>
          <CardDescription className="text-center">
            Añade una enfermedad con su respectivo nivel de gravedad
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-6">
              <FormField
                name="name"
                label="Nombre de la enfermedad"
                placeholder="Ej. Parvovirus"
                register={register}
                error={errors.name?.message}
              />

              <div className="grid gap-1 flex-1 min-w-[250px]">
                <Label htmlFor="severity">Gravedad</Label>
                <select {...register('severity')} className="border p-2 rounded">
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
                {submitting ? "Registrando..." : "Registrar Enfermedad"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
