import { Link } from "react-router-dom";
import { User } from "lucide-react";

export default function HeaderUserAction() {
  return (
    <Link
      to="/login"
      className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-primary transition-transform duration-500 hover:scale-105"
    >
      <User className="w-5 h-5" />
    </Link>
  );
}
