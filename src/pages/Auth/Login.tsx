import { Suspense, lazy } from "react";
const LoginForm = lazy(() => import("@/components/login-form"));

export default function Page() {
  return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <Suspense fallback={<p className="text-black">Cargando login...</p>}>
          <div className="w-full max-w-sm">
              <LoginForm />
          </div>
        </Suspense>
      </div>
  );
}
