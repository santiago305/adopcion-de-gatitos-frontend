import { useState } from "react";
import { cn } from "@/lib/utils";
import { fullRegisterCredentials, RegisterCredentials } from "@/types/auth";
import { fullRegisterSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import FieldError from "./ui/FieldError";
import { CreateClientsDto } from "@/types/clients";
import { createClients } from "@/services/clientsService";
import { useAuth } from "@/hooks/useAuth";
import { successResponse } from "@/common/utils/response";
import FormField from "./ui/formField";
import { RoutesPaths } from "@/router/config/routesPaths";
import { useFlashMessage } from "@/hooks/useFlashMessage";

function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const { clientUserRegister } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const { showFlash, clearFlash } = useFlashMessage();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<fullRegisterCredentials>({
    resolver: zodResolver(fullRegisterSchema), 
  });

  const onSubmit =  async (data: fullRegisterCredentials) => {
    clearFlash(); 
    setSubmitting(true);

    try {
      const userData:RegisterCredentials = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const userResponse = await clientUserRegister(userData);
      if (userResponse) {
        const clientData: CreateClientsDto = {
          phone: data.phone, 
          gender: data.gender, 
          birth_date: data.birth_date, 
        };
        await createClients(clientData);

        navigate(RoutesPaths.home, {
          state: {
            flashMessage: successResponse("Te has registrado correctamente"),
          },
        });
      }
      
      
    } catch (error: any) {
      const message = error.response?.data?.message;
      showFlash({ type: message.type, message: message.message });
      
    } finally {
      setSubmitting(false);
    }
  }

  

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Registrate con tu cuenta
          </CardTitle>
          <CardDescription
          className="text-center"
          >
            Registrate hoy para obtener todos los productos que desees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">

              <FormField 
                name="name" 
                label="Nombre" 
                placeholder="jose mauricio" 
                register={register} 
                error={errors.name?.message} 
              />

              <FormField 
                name="email" 
                label="Correo Electrónico" 
                placeholder="m@e123.com" 
                register={register} 
                error={errors.email?.message} 
              />

              <FormField 
                name="password" 
                label="Contraseña" 
                placeholder="m@e123.com"
                type="password" 
                register={register} 
                error={errors.password?.message} 
              />

              <FormField 
                name="phone" 
                label="Teléfono" 
                placeholder="987654321"
                register={register} 
                error={errors.phone?.message} 
              />

              <div className="grid gap-1">
                <Label htmlFor="birth_date">Fecha de Nacimiento</Label>
                <Input type="date" {...register('birth_date')} />
                <div className="min-h-3 h-auto">
                  <FieldError error={errors.birth_date?.message} />
                </div>
              </div>

              <div className="grid gap-1">
                <Label>Género</Label>
                <select {...register('gender')}>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                </select>
                <div className="min-h-3 h-auto">
                  <FieldError error={errors.gender?.message} />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Cargando..." : "Register"}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              ¿ya tienes una cuenta?{" "}
              <Link to={RoutesPaths.login} className="underline underline-offset-4">
                Iniciar sesión
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
export default RegisterForm