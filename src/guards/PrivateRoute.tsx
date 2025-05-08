import { Navigate } from "react-router-dom";
import { isTokenStructurallyValid } from "@/utils/auth";
import { PropsUrl } from "./typeGuards";

export default function PrivateRoute({ children, redirectTo = "/login" }: PropsUrl) {
  if (!isTokenStructurallyValid()) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
