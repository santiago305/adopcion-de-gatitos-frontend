import { Suspense, lazy } from "react";
import { FlashMessageProvider } from "@/context/FlashMessageContext";
import { FlashMessageRoot } from "@/components/flashMessage/FlashMessageRoot";

const LoginForm = lazy(() => import("@/components/login-form"));

export default function Page() {
  return (
    <FlashMessageProvider>
      <FlashMessageRoot />
      <Suspense fallback={<p className="text-black">Cargando login...</p>}>
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
              <LoginForm />
          </div>
      </div>
      </Suspense>
    </FlashMessageProvider>
  );
}
