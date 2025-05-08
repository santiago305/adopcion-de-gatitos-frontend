import { Navigate } from "react-router-dom";
import { isTokenStructurallyValid } from "@/utils/auth";
import { PropsUrl } from "./typeGuards";

export default function AuthRedirectGuard({ children, redirectTo = "/dashboard" }: PropsUrl) {
  if (isTokenStructurallyValid()) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
