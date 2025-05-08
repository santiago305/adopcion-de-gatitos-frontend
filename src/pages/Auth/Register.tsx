import { lazy, Suspense } from "react";

const RegisterForm = lazy(() => import("@/components/register-form"));

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Suspense fallback={<p className="text-black">Cargando login...</p>}>
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </Suspense>
    </div>
  )
}
