import { Link } from "react-router-dom";
import { User, LayoutDashboard } from "lucide-react"; // Dashboard Icon
import { RoutesPaths } from "@/router/config/routesPaths";
import { useAuth } from "@/hooks/useAuth";

export default function HeaderUserAction() {
  const { isAuthenticated } = useAuth();

  return (
    <Link
      to={isAuthenticated ? RoutesPaths.dashboard : RoutesPaths.login}
      className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-primary transition-transform duration-500 hover:scale-105"
    >
      {isAuthenticated ? (
        <LayoutDashboard className="w-5 h-5" />
      ) : (
        <User className="w-5 h-5" /> 
      )}
    </Link>
  );
}
