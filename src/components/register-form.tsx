import { useState } from "react";
import { cn } from "@/lib/utils";
import { UrlPage } from "@/router/RouterTypes";
import { registerUser } from "@/services/authService";
import { errorResponse, successResponse } from "@/common/utils/response";
import { fullRegisterCredentials, RegisterCredentials } from "@/types/auth";
import { fullRegisterSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useFlashMessage } from "@/context/FlashMessageContext";
import FieldError from "./ui/FieldError";
import { CreateClientsDto } from "@/types/clients";
import { createClients } from "@/services/clientsService";

function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const LoginRoute = UrlPage.find(route => route.name === "Login");
  const homeRoute = UrlPage.find(route => route.name === "Home");
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { showFlash, clearFlash } = useFlashMessage();
  const { register, handleSubmit, formState: { errors } } = useForm<fullRegisterCredentials>({
    resolver: zodResolver(fullRegisterSchema), 
  });

  if (!LoginRoute) return null;

  const onSubmit =  async (data: fullRegisterCredentials) => {
    clearFlash(); 
    setSubmitting(true);

    try {
      const userData:RegisterCredentials = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const userResponse = await registerUser(userData);
      if (userResponse) {
        const clientData: CreateClientsDto = {
          phone: data.phone, 
          gender: data.gender, 
          birth_date: data.birth_date, 
        };
        await createClients(clientData);

      }
      if (!homeRoute) {
        showFlash(errorResponse("no se encontro la url"));
        return;
      }
      navigate(homeRoute.url, {
        state: {
          flashMessage: successResponse("Inicio de sesión exitoso"),
        },
      });
      
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
            <div className="grid gap-1">
                <Label>Nombre</Label>
                <Input {...register('name')}   placeholder="jose mauricio"/>
                <div className="min-h-3 h-auto">
                  <FieldError error={errors.name?.message} />
                </div>
              </div>

              <div className="grid gap-1">
                <Label>Correo Electrónico</Label>
                <Input {...register('email')} placeholder="m@e123.com"/>
                <div className="min-h-3 h-auto">
                  <FieldError error={errors.email?.message} />
                </div>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input {...register('password')} type="password"/>
                <div className="min-h-3 h-auto">
                  <FieldError error={errors.password?.message} />
                </div>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="phone">Teléfono</Label>
                <Input {...register('phone')} placeholder="987654321" />
                <div className="min-h-3 h-auto">
                  <FieldError error={errors.phone?.message} />
                </div>
              </div>

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
              <Link to={LoginRoute.url} className="underline underline-offset-4">
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